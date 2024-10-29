
const { Pool } = require('pg');
const config = require('../config/index')
const pool = new Pool({
  user: config.DB_USER ,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: 5432,
});
//vamos a crear la tabla users si no existe.
const initDb = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(50) NOT NULL,
          apellido VARCHAR(50) NOT NULL,
          correo VARCHAR(100) UNIQUE NOT NULL,
          contraseña VARCHAR(100) NOT NULL,
          edad INT,
          fecha_nacimiento DATE
        );
      `);
      console.log("Tabla 'users' creada o ya existe");
    } finally {
      client.release();
    }
  };

module.exports = {pool, initDb};
