import { createGoogleGenerativeAI } from '@ai-sdk/google';

const genai = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
})

export default genai
