import { Pool } from 'pg'

const useSsl = process.env.NODE_ENV === 'production'
const ssl = useSsl ? { rejectUnauthorized: false } : false
const maxConnections = process.env.POSTGRES_MAX_CONNECTIONS
  ? parseInt(process.env.POSTGRES_MAX_CONNECTIONS)
  : 20

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl,
  max: maxConnections,
})

export const db = pool
