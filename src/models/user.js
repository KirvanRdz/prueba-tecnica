const {pool} = require('../db/connection');

class User {
  constructor(version, { id, nombre, apellido, correo, contraseña, edad, fecha_nacimiento }) {
    this.id = id;
    this.version = version;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contraseña = contraseña;
    
    // Solo asignar propiedades si son parte de la versión 2
    if (version === 'v2') {
      this.edad = edad;
      this.fecha_nacimiento = fecha_nacimiento;
    }
  }

  // Método para guardar el usuario en la base de datos
  async save() {
    const query = this.version === 'v1'
      ? 'INSERT INTO users (nombre, apellido, correo, contraseña) VALUES ($1, $2, $3, $4) RETURNING *'
      : 'INSERT INTO users (nombre, apellido, correo, contraseña, edad, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const values = this.version === 'v1'
      ? [this.nombre, this.apellido, this.correo, this.contraseña]
      : [this.nombre, this.apellido, this.correo, this.contraseña, this.edad, this.fecha_nacimiento];

    let client;
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, values);
      
      return rows[0];
    } catch (error) {
      console.error('Error insertando usuario:', error.stack);
      return 'ERROR';
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  // Método para obtener un usuario por ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    let client;
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error obteniendo usuario por ID:', error.stack);
      return 'ERROR';
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  // Método para actualizar un usuario por ID
  async updateById() {
    const fields = [];
    const values = [];
    let index = 1;
  
    // Añadir campos a actualizar según si existen o no en la instancia
    if (this.nombre) {
      fields.push(`nombre = $${index++}`);
      values.push(this.nombre);
    }
    if (this.apellido) {
      fields.push(`apellido = $${index++}`);
      values.push(this.apellido);
    }
    if (this.correo) {
      fields.push(`correo = $${index++}`);
      values.push(this.correo);
    }
    if (this.contraseña) {
      fields.push(`contraseña = $${index++}`);
      values.push(this.contraseña);
    }
    if (this.version === 'v2') {
      if (this.edad) {
        fields.push(`edad = $${index++}`);
        values.push(this.edad);
      }
      if (this.fecha_nacimiento) {
        fields.push(`fecha_nacimiento = $${index++}`);
        values.push(this.fecha_nacimiento);
      }
    }
  
    // Asegurarse de que haya al menos un campo para actualizar
    if (fields.length === 0) {
      throw new Error('No se proporcionaron campos para actualizar.');
    }
  
    // Añadir ID para la cláusula WHERE
    values.push(this.id);
  
    // Construir consulta SQL dinámicamente
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  
    let client;
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error actualizando usuario por ID:', error.stack);
      return 'ERROR';
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  

  // Método para eliminar un usuario por ID
  static async deleteById(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    let client;
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error eliminando usuario por ID:', error.stack);
      return 'ERROR';
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  // Método para encontrar un usuario por correo electrónico
  static async findOneByEmail(correo) {
    const query = 'SELECT * FROM users WHERE correo = $1';
    let client;
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, [correo]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error obteniendo usuario por correo:', error.stack);
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  // Método para verificar si el nombre y apellido ya están en uso
  static async findOneByNameAndLastname(nombre, apellido) {
    const query = 'SELECT * FROM users WHERE nombre = $1 AND apellido = $2';
    const values = [nombre, apellido];
    let client;
    console.log(nombre + " "+ apellido)
    try {
      client = await pool.connect();
      const { rows } = await client.query(query, values);
      console.log(rows)
      return rows[0] || null; // Retorna el usuario encontrado o null si no existe
    } catch (error) {
      console.error('Error verificando duplicado de nombre y apellido:', error.stack);
      return null;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = User;
