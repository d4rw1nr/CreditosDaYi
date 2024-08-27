import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // fetch inicial de la tabla de clientes
    useEffect(() => {
      // Obtener la lista de clientes cuando el componente se monta
      const fetchClientes = async () => {
          try {
              const response = await axios.get('http://localhost:8000/api/ventas/clientes/', {
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                  }
              });
              setClientes(response.data);
          } catch (error) {
              console.error('Error fetching clientes', error);
          }
      };

      fetchClientes();
  }, []); // El array vacío [] significa que esto se ejecuta solo una vez cuando el componente se monta

  // post para agregar cliente
  const handleSubmit = async (e) => {
      e.preventDefault();

      const newCliente = {
          nombre,
          direccion,
          telefono
      };

      try {
          const response = await axios.post('http://localhost:8000/api/ventas/clientes/', newCliente, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
              }
          });
          setClientes([...clientes, response.data]); // Agregar el nuevo cliente a la lista existente
          setNombre('');
          setDireccion('');
          setTelefono('');
      } catch (error) {
          console.error('Error creating cliente', error);
      }
  };

  // Filtrado de clientes
  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toString().includes(searchTerm)
  );


    return (
      <div>
        <h2>Registrar Cliente</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Direcci&oacute;n:</label>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Tel&eacute;fono:</label>
                <input
                    type="integer"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Crear Cliente</button>
        </form>

        <h2>Buscar Cliente</h2>
            <input
                type="text"
                placeholder="Buscar por nombre, dirección o teléfono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
            />

        <h2>Lista de Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    );
}

export default Clientes;
