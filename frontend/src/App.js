
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Inventario from './components/Inventario';
import Ventas from './components/Ventas';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Clientes from './components/Clientes';
import Proveedores from './components/Proveedores';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/inventario" element={<PrivateRoute element={Inventario} />} />
        <Route path="/ventas" element={<PrivateRoute element={Ventas} />} />
        <Route path="/clientes" element={<PrivateRoute element={Clientes} />} />
        <Route path="/proveedores" element={<PrivateRoute element={Proveedores} />} />
      </Routes>
    </Router>
  );
}

export default App;
