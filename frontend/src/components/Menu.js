
import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <h2>Menu Principal</h2>
      <ul>
        <li>
          <Link to="/inventario">Inventario</Link>
        </li>
        <li>
          <Link to="/ventas">Ventas</Link>
        </li>
        <li>
          <Link to="/cobranza">Cobranza</Link>
        </li>
        <li>
          <Link to="/contabilidad">Contabilidad</Link>
        </li>
        <li>
          <Link to="/personal">Personal</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
