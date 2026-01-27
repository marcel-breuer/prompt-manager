import { Pool } from 'pg'

const connectionString =
  process.env.POSTGRES_URL ||
  'postgres://user:password@host:port/database_fallback'

const pool = new Pool({
  connectionString: connectionString,
})

export const db = pool
