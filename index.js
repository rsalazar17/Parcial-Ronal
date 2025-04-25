const express = require('express');
   const cors = require('cors');
   require('dotenv').config();
   const db = require('./db.js');
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   
   app.use('/api/restaurantes', require('./routes/restaurante'));
   app.use('/api/empleados', require('./routes/empleado'));
   app.use('/api/productos', require('./routes/producto'));
   app.use('/api/pedidos', require('./routes/pedido'));
   app.use('/api/detalle-pedidos', require('./routes/detallePedido')); 
   app.use('/api/consultas', require('./routes/consultas'));
   app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor!' });
   });
   
   app.get('/', (req, res) => {
    res.send('API de Restaurante');
   });
   
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
   });