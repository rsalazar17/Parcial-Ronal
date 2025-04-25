const pool = require('../db');
   
   exports.getProductosDePedido = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        `SELECT p.nombre, dp.cantidad, dp.subtotal
         FROM DetallePedido dp
         JOIN Producto p ON dp.id_prod = p.id_prod
         WHERE dp.id_pedido = $1`,
        [id]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener productos del pedido' });
    }
   };
   
   exports.getMasVendidos = async (req, res) => {
    const min = parseInt(req.query.min) || 10;
    try {
      const result = await pool.query(
        `SELECT p.nombre, SUM(dp.cantidad) AS total_vendidos
         FROM DetallePedido dp
         JOIN Producto p ON dp.id_prod = p.id_prod
         GROUP BY p.nombre
         HAVING SUM(dp.cantidad) > $1`,
        [min]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener productos más vendidos' });
    }
   };
   
   exports.getVentasPorRestaurante = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT r.nombre, SUM(p.total) AS total_ventas
         FROM Pedido p
         JOIN Restaurante r ON p.id_rest = r.id_rest
         GROUP BY r.nombre`
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener ventas por restaurante' });
    }
   };
   
   exports.getPedidosPorFecha = async (req, res) => {
    const { fecha } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM Pedido WHERE fecha = $1',
        [fecha]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener pedidos por fecha' });
    }
   };
   
   exports.getEmpleadosPorRol = async (req, res) => {
    const { rol, id_rest } = req.params;
    try {
      const result = await pool.query(
        'SELECT * FROM Empleado WHERE rol = $1 AND id_rest = $2',
        [rol, id_rest]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener empleados por rol' });
    }
   };