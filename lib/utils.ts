import { embed } from 'ai'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import genai from './genai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateEmbedding(_input: string) {
  const input = _input.replace(/\n/g, ' ')
  const { embedding } = await embed({
    model: genai.textEmbeddingModel('text-embedding-004'),
    value: input,
  })
  return embedding
}
