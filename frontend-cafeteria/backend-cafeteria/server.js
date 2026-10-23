import express from 'express';
import cors from 'cors';
import { supabase } from './supabaseClient.js';
// (Opcional) Aquí importarías tus conexiones o librerías para MySQL local y Azure

const app = express();
app.use(cors());
app.use(express.json());

// 1. Endpoint para MySQL Local
app.get('/api/local/datos', async (req, res) => {
  try {
    // Aquí harás la consulta a tu base de datos local de MySQL
    res.json([{ id: 1, nombre: 'Café Local (Ejemplo)', precio: '$2000' }]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Endpoint para Azure MySQL Corporativa
app.get('/api/azure/datos', async (req, res) => {
  try {
    // Aquí harás la consulta a la base de datos de Azure
    res.json([{ id: 1, nombre: 'Café Azure Corporativo (Ejemplo)', precio: '$2500' }]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Endpoint para Supabase
app.get('/api/supabase/datos', async (req, res) => {
  try {
    // REEMPLAZA 'nombre_de_tu_tabla_en_supabase' por el nombre real que creaste en Supabase
    const { data, error } = await supabase
      .from('tbl_sugerencias_pqr')   
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});