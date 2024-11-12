import 'dotenv/config'
import { db } from './db'
import { pokemons } from './schema'
import { eq, sql } from 'drizzle-orm'
import pokemon from './pokemon.json'
import { generateEmbedding } from '../lib/utils'

async function main() {
  try {
    // Check if we're in production
    const isProd = process.env.NODE_ENV === 'production'

    // Check if the vector extension exists
    const extensionExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM pg_extension WHERE extname = 'vector'
      );
    `);

    if (!extensionExists.rows[0].exists) {
      console.log('Vector extension does not exist. Creating...');
      await db.execute(sql`CREATE EXTENSION vector;`);
      console.log('Vector extension created successfully.');
    }

    // Only drop tables in development
    if (!isProd) {
      console.log('Dropping existing pokemon table...');
      await db.execute(sql`DROP TABLE IF EXISTS pokemon;`);
      console.log('Pokemon table dropped successfully.');
    }

    // Create the pokemon table if it doesn't exist
    console.log('Creating pokemon table if it doesn\'t exist...');
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS pokemon (
        id TEXT PRIMARY KEY,
        number INTEGER NOT NULL,
        name TEXT NOT NULL,
        type1 TEXT NOT NULL,
        type2 TEXT,
        total INTEGER NOT NULL,
        hp INTEGER NOT NULL,
        attack INTEGER NOT NULL,
        defense INTEGER NOT NULL,
        "spAtk" INTEGER NOT NULL,
        "spDef" INTEGER NOT NULL,
        speed INTEGER NOT NULL,
        generation INTEGER NOT NULL,
        legendary BOOLEAN NOT NULL,
        embedding vector(768)
      );
    `);
    console.log('Pokemon table created successfully.');

    const pika = await db.query.pokemons.findFirst({
      where: (pokemons, { eq }) => eq(pokemons.name, 'Pikachu'),
    })

    if (pika) {
      console.log('Pokédex already seeded!')
      return
    }
  } catch (error) {
    console.error('Error in database operations:', error);
    throw error;
  }
  for (const record of (pokemon as any).data) {
    // In order to save time, we'll just use the embeddings we've already generated
    // for each Pokémon. If you want to generate them yourself, uncomment the
    // following line and comment out the line after it.

    const { ...p } = record
    const embedding = await generateEmbedding(p.name);
    await new Promise((r) => setTimeout(r, 500)); // Wait 500ms between requests;
    // Create the pokemon in the database
    const [pokemon] = await db.insert(pokemons).values(p).returning()

    await db
      .update(pokemons)
      .set({
        embedding,
      })
      .where(eq(pokemons.id, pokemon.id))

    console.log(`Added ${pokemon.number} ${pokemon.name}`)
  }

  // Uncomment the following lines if you want to generate the JSON file
  // fs.writeFileSync(
  //   path.join(__dirname, "./pokemon-with-embeddings.json"),
  //   JSON.stringify({ data }, null, 2),
  // );
  console.log('Pokédex seeded successfully!')
}
main()
  .then(async () => {
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)

    process.exit(1)
  })

