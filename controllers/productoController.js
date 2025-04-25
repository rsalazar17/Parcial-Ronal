const pool = require('../db');

exports.getAll = async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM Producto');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener productos' });
 }
};

exports.getById = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('SELECT * FROM Producto WHERE id_prod = $1', [id]);
   if (result.rows.length === 0) {
     return res.status(404).json({ error: 'Producto no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener producto' });
 }
};

exports.create = async (req, res) => {
 const { nombre, precio } = req.body;
 try {
   const result = await pool.query(
     'INSERT INTO Producto (nombre, precio) VALUES ($1, $2) RETURNING *',
     [nombre, precio]
   );
   res.status(201).json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al crear producto' });
 }
};

exports.update = async (req, res) => {
 const { id } = req.params;
 const { nombre, precio } = req.body;
 try {
   const result = await pool.query(
     'UPDATE Producto SET nombre = $1, precio = $2 WHERE id_prod = $3 RETURNING *',
     [nombre, precio, id]
   );
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Producto no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al actualizar producto' });
 }
};

exports.delete = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('DELETE FROM Producto WHERE id_prod = $1 RETURNING *', [id]);
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Producto no encontrado' });
   }
   res.json({ message: 'Producto eliminado correctamente' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al eliminar producto' });
 }
};

