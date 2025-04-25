const pool = require('../db');

exports.getAll = async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM Empleado');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener empleados' });
 }
};

exports.getById = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('SELECT * FROM Empleado WHERE id_empleado = $1', [id]);
   if (result.rows.length === 0) {
     return res.status(404).json({ error: 'Empleado no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener empleado' });
 }
};

exports.create = async (req, res) => {
 const { nombre, rol, id_rest } = req.body;
 try {
   const result = await pool.query(
     'INSERT INTO Empleado (nombre, rol, id_rest) VALUES ($1, $2, $3) RETURNING *',
     [nombre, rol, id_rest]
   );
   res.status(201).json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al crear empleado' });
 }
};

exports.update = async (req, res) => {
 const { id } = req.params;
 const { nombre, rol, id_rest } = req.body;
 try {
   const result = await pool.query(
     'UPDATE Empleado SET nombre = $1, rol = $2, id_rest = $3 WHERE id_empleado = $4 RETURNING *',
     [nombre, rol, id_rest, id]
   );
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Empleado no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al actualizar empleado' });
 }
};

exports.delete = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('DELETE FROM Empleado WHERE id_empleado = $1 RETURNING *', [id]);
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Empleado no encontrado' });
   }
   res.json({ message: 'Empleado eliminado correctamente' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al eliminar empleado' });
 }
};

