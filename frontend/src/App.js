
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Inventario from './components/Inventario';
import Ventas from './components/Ventas';
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
      </Routes>
    </Router>
  );
}

export default App;
