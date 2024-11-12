import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  vector,
} from 'drizzle-orm/pg-core'
import { randomUUID } from 'crypto'

export const pokemons = pgTable(
  'pokemon',
  {
    id: text('id')
      .primaryKey()
      .notNull()
      .$defaultFn(() => randomUUID()),
    number: integer('number').notNull().default(0),
    name: text('name').notNull().default(''),
    type1: text('type1').notNull().default(''),
    type2: text('type2'),
    total: integer('total').notNull().default(0),
    hp: integer('hp').notNull().default(0),
    attack: integer('attack').notNull().default(0),
    defense: integer('defense').notNull().default(0),
    spAtk: integer('spAtk').notNull().default(0),
    spDef: integer('spDef').notNull().default(0),
    speed: integer('speed').notNull().default(0),
    generation: integer('generation').notNull().default(1),
    legendary: boolean('legendary').notNull().default(false),
    embedding: vector('embedding', { dimensions: 768 }),
  },
  (table) => ({
    embeddingIndex: index().using(
      'hnsw',
      table.embedding.op('vector_cosine_ops')
    ),
  })
)

export type SelectPokemon = typeof pokemons.$inferSelect
