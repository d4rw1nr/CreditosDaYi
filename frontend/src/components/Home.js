
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Creditos DaYi</h1>
      <div style={{ marginTop: '20px' }}>
        <button
          style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => navigate('/ventas')}
        >
          Registrar Nueva Venta
        </button>
        <button
          style={{ padding: '10px 20px', fontSize: '16px' }}
          onClick={() => navigate('/inventario')}
        >
          Revisión del Stock
        </button>
      </div>
    </div>
  );
}

export default Home;
