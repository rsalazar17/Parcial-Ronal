const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.nyupydipbbeegmuvbiak',
  host: 'aws-0-us-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'Ronal1731Felipe',
  port: 5432,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000
});

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('ERROR CRÍTICO:', err.message);
  } else {
    console.log('CONEXIÓN EXITOSA A SUPABASE');
  }
});

module.exports = pool;