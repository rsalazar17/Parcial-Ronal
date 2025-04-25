const pool = require('../db');
   
exports.getAll = async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM Restaurante');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener restaurantes' });
 }
};

exports.getById = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('SELECT * FROM Restaurante WHERE id_rest = $1', [id]);
   if (result.rows.length === 0) {
     return res.status(404).json({ error: 'Restaurante no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener restaurante' });
 }
};

exports.create = async (req, res) => {
 const { nombre, ciudad, direccion, fecha_apertura } = req.body;
 try {
   const result = await pool.query(
     'INSERT INTO Restaurante (nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4) RETURNING *',
     [nombre, ciudad, direccion, fecha_apertura]
   );
   res.status(201).json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al crear restaurante' });
 }
};

exports.update = async (req, res) => {
 const { id } = req.params;
 const { nombre, ciudad, direccion, fecha_apertura } = req.body;
 try {
   const result = await pool.query(
     'UPDATE Restaurante SET nombre = $1, ciudad = $2, direccion = $3, fecha_apertura = $4 WHERE id_rest = $5 RETURNING *',
     [nombre, ciudad, direccion, fecha_apertura, id]
   );
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Restaurante no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al actualizar restaurante' });
 }
};

exports.delete = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('DELETE FROM Restaurante WHERE id_rest = $1 RETURNING *', [id]);
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Restaurante no encontrado' });
   }
   res.json({ message: 'Restaurante eliminado correctamente' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al eliminar restaurante' });
 }
};

