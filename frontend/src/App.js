
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import Ventas from './components/Ventas';
import Cobranza from './components/Cobranza';
import Contabilidad from './components/Contabilidad';
import Personal from './components/Personal';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/menu" element={<PrivateRoute element={Menu} />} />
        <Route path="/inventario" element={<PrivateRoute element={Inventario} />} />
        <Route path="/ventas" element={<PrivateRoute element={Ventas} />} />
        <Route path="/cobranza" element={<PrivateRoute element={Cobranza} />} />
        <Route path="/contabilidad" element={<PrivateRoute element={Contabilidad} />} />
        <Route path="/personal" element={<PrivateRoute element={Personal} />} />
      </Routes>
    </Router>
  );
}

export default App;
