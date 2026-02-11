const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const migrate = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS prompts (
        id SERIAL PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        gpt_link VARCHAR(255),
        prompt TEXT NOT NULL
      );
    `);

    // Read and insert data
    const data = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './public/json/prompts.json'), 'utf8'));

    for (const prompt of data) {
      await client.query(
        `INSERT INTO prompts (category, title, description, gpt_link, prompt) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (title) 
         DO UPDATE SET 
           category = EXCLUDED.category,
           description = EXCLUDED.description,
           gpt_link = EXCLUDED.gpt_link,
           prompt = EXCLUDED.prompt;`,
        [prompt.category, prompt.title, prompt.description, prompt.gpt_link, prompt.prompt]
      );
    }

    await client.query('COMMIT');
    console.log('Migration completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
  } finally {
    client.release();
    pool.end();
  }
};

migrate();