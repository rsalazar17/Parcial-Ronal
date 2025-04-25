const pool = require('../db');

exports.getAll = async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM Pedido');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener pedidos' });
 }
};

exports.getById = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('SELECT * FROM Pedido WHERE id_pedido = $1', [id]);
   if (result.rows.length === 0) {
     return res.status(404).json({ error: 'Pedido no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener pedido' });
 }
};

exports.create = async (req, res) => {
 const { fecha, id_rest, total } = req.body;
 try {
   const result = await pool.query(
     'INSERT INTO Pedido (fecha, id_rest, total) VALUES ($1, $2, $3) RETURNING *',
     [fecha, id_rest, total]
   );
   res.status(201).json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al crear pedido' });
 }
};

exports.update = async (req, res) => {
 const { id } = req.params;
 const { fecha, id_rest, total } = req.body;
 try {
   const result = await pool.query(
     'UPDATE Pedido SET fecha = $1, id_rest = $2, total = $3 WHERE id_pedido = $4 RETURNING *',
     [fecha, id_rest, total, id]
   );
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Pedido no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al actualizar pedido' });
 }
};

exports.delete = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('DELETE FROM Pedido WHERE id_pedido = $1 RETURNING *', [id]);
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Pedido no encontrado' });
   }
   res.json({ message: 'Pedido eliminado correctamente' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al eliminar pedido' });
 }
};

