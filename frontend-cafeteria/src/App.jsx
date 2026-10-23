import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [bdSeleccionada, setBdSeleccionada] = useState('local');
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Cargar datos según la base de datos seleccionada
  const cargarDatos = async (origen) => {
    setCargando(true);
    setBdSeleccionada(origen);
    try {
      // Ajusta las rutas según tus endpoints de Node.js
      const res = await axios.get(`http://localhost:5000/api/${origen}/datos`);
      setDatos(res.data);
    } catch (error) {
      console.error(`Error cargando datos de ${origen}:`, error);
      setDatos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos('local');
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '30px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <h1>☕ Sistema de Gestión de Cafetería - Multi-BD</h1>
      <p>Demostración de arquitectura distribuida: Azure, Local VM y Supabase</p>

      {/* Botones de navegación de BD */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <button 
          onClick={() => cargarDatos('local')}
          style={{ padding: '10px 20px', backgroundColor: bdSeleccionada === 'local' ? '#2563eb' : '#e5e7eb', color: bdSeleccionada === 'local' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          🏠 MySQL Local (VM)
        </button>

        <button 
          onClick={() => cargarDatos('azure')}
          style={{ padding: '10px 20px', backgroundColor: bdSeleccionada === 'azure' ? '#0284c7' : '#e5e7eb', color: bdSeleccionada === 'azure' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          ☁️ Azure MySQL Corporativa
        </button>

        <button 
          onClick={() => cargarDatos('supabase')}
          style={{ padding: '10px 20px', backgroundColor: bdSeleccionada === 'supabase' ? '#16a34a' : '#e5e7eb', color: bdSeleccionada === 'supabase' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          ⚡ Supabase Cloud
        </button>
      </div>

      {/* Tabla de Resultados */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2>Registros en: <span style={{ color: '#2563eb' }}>{bdSeleccionada.toUpperCase()}</span></h2>
        
        {cargando ? (
          <p>Cargando información desde el servidor...</p>
        ) : datos.length === 0 ? (
          <p>No hay registros disponibles o no se pudo establecer conexión.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>ID</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Nombre / Producto</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px' }}>{item.id || index + 1}</td>
                  <td style={{ padding: '10px' }}>{item.nombre || item.producto || JSON.stringify(item)}</td>
                  <td style={{ padding: '10px' }}>{item.precio || item.descripcion || 'Sin detalle'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;