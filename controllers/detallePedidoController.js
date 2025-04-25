const pool = require('../db');

exports.getAll = async (req, res) => {
 try {
   const result = await pool.query('SELECT * FROM DetallePedido');
   res.json(result.rows);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener detalles de pedido' });
 }
};

exports.getById = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('SELECT * FROM DetallePedido WHERE id_detalle = $1', [id]);
   if (result.rows.length === 0) {
     return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al obtener detalle de pedido' });
 }
};

exports.create = async (req, res) => {
 const { id_pedido, id_prod, cantidad, subtotal } = req.body;
 try {
   const result = await pool.query(
     'INSERT INTO DetallePedido (id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4) RETURNING *',
     [id_pedido, id_prod, cantidad, subtotal]
   );
   res.status(201).json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al crear detalle de pedido' });
 }
};

exports.update = async (req, res) => {
 const { id } = req.params;
 const { id_pedido, id_prod, cantidad, subtotal } = req.body;
 try {
   const result = await pool.query(
     'UPDATE DetallePedido SET id_pedido = $1, id_prod = $2, cantidad = $3, subtotal = $4 WHERE id_detalle = $5 RETURNING *',
     [id_pedido, id_prod, cantidad, subtotal, id]
   );
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
   }
   res.json(result.rows[0]);
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al actualizar detalle de pedido' });
 }
};

exports.delete = async (req, res) => {
 const { id } = req.params;
 try {
   const result = await pool.query('DELETE FROM DetallePedido WHERE id_detalle = $1 RETURNING *', [id]);
   if (result.rowCount === 0) {
     return res.status(404).json({ error: 'Detalle de pedido no encontrado' });
   }
   res.json({ message: 'Detalle de pedido eliminado correctamente' });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: 'Error al eliminar detalle de pedido' });
 }
};