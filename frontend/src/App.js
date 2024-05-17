// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import Ventas from './components/Ventas';
import Cobranza from './components/Cobranza';
import Contabilidad from './components/Contabilidad';
import Personal from './components/Personal';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/menu" element={<PrivateRoute component={Menu} />} />
        <Route path="/inventario" element={<PrivateRoute component={Inventario} />} />
        <Route path="/ventas" element={<PrivateRoute component={Ventas} />} />
        <Route path="/cobranza" element={<PrivateRoute component={Cobranza} />} />
        <Route path="/contabilidad" element={<PrivateRoute component={Contabilidad} />} />
        <Route path="/personal" element={<PrivateRoute component={Personal} />} />
      </Routes>
    </Router>
  );
}

export default App;
