
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
      </ul>
    </div>
  );
}

export default Menu;
