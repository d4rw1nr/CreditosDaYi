
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid text-center" width="100%">
      <div className="row align-items-center">

        <div className="col">
        <br></br><br></br><br></br>
        <h1>CR&Eacute;DITOS DAYI</h1>
        <br></br><br></br>
        <img
        src="logo.webp"
        alt="Logo Creditos DaYi"
        style={{ maxWidth: '50%', height: 'auto' }}
        />
        </div>
        
        <div className="col">
        <div className="d-grid gap-2 col-8 mx-auto">
        <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/ventas')}>
          Ventas
        </button>
        <br></br>
        <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/inventario')}>
          Inventario
        </button>
        <br></br>
        <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/clientes')}>
          Clientes
        </button>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
