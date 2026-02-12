import { db } from '../lib/db'
import { Prompt } from '../types/prompt'
import Prompts from './prompts'

async function getPrompts(): Promise<Prompt[]> {
  try {
    const { rows } = await db.query('SELECT * FROM prompts')
    return rows
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return []
  }
}

export default async function Home() {
  const prompts = await getPrompts()
  return <Prompts prompts={prompts} />
}
