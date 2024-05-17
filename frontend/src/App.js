// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/inventario" component={Inventario} />
        <PrivateRoute path="/ventas" component={Ventas} />
        <PrivateRoute path="/cobranza" component={Cobranza} />
        <PrivateRoute path="/contabilidad" component={Contabilidad} />
        <PrivateRoute path="/personal" component={Personal} />
      </Switch>
    </Router>
  );
}

export default App;
