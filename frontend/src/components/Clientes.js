import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editClienteId, setEditClienteId] = useState(null);
    const [editData, setEditData] = useState({ nombre: '', direccion: '', telefono: '' });

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


const handleEditClick = (cliente) => {
    setEditClienteId(cliente.id);
    setEditData({
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
    });
};

const handleSaveClick = async (id) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/ventas/clientes/${id}/`, editData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        setClientes(clientes.map(cliente => cliente.id === id ? response.data : cliente));
        setEditClienteId(null);  // Exit edit mode
    } catch (error) {
        console.error('Error saving cliente', error);
    }
};

const handleDeleteClick = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
            await axios.delete(`http://localhost:8000/api/ventas/clientes/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error('Error deleting cliente', error);
        }
    }
};

const handleChange = (e) => {
    setEditData({
        ...editData,
        [e.target.name]: e.target.value,
    });
};


  // Filtrado de clientes
    const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.toString().includes(searchTerm)
);


    return (
    <div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Creditos DaYi</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/ventas">Ventas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/inventario">Inventario</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true" href="/clientes">Clientes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/proveedores">Proveedores</a>
              </li>
            </ul>
            </div>
        </div>
    </nav>
    
    <br></br>
        <div>
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Registrar Cliente</h2>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px'}}>
                            <label style={{ marginRight: '10px', marginLeft: '20px' }}> Nombre: </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />

                            <label style={{ marginRight: '10px', marginLeft: '20px' }}>Direcci&oacute;n:</label>
                            <input
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />

                            <label style={{ marginRight: '10px', marginLeft: '20px' }}>Tel&eacute;fono:</label>
                            <input
                                type="integer"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />

                            <button type="submit" style={{ marginLeft: '20px' }}>Crear Cliente</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Buscar Cliente</h2>
                        <input style={{width: '700px'}}
                            type="text"
                            placeholder="Buscar por nombre, dirección o teléfono"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
                        />
                </div>
            </div>

            <div class="card border border-0">
                <div class="card-body">
                    <h2 class="card-title">Lista de Clientes</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>
                                            {editClienteId === cliente.id ? (
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={editData.nombre}
                                                    onChange={handleChange}
                                                />
                                            ) : (cliente.nombre)}
                                        </td>
                                        <td>
                                            {editClienteId === cliente.id ? (
                                                <input
                                                    type="text"
                                                    name="direccion"
                                                    value={editData.direccion}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                cliente.direccion
                                            )}
                                        </td>
                                        <td>
                                            {editClienteId === cliente.id ? (
                                                <input
                                                    type="integer"
                                                    name="telefono"
                                                    value={editData.telefono}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                cliente.telefono
                                            )}
                                        </td>
                                        <td>
                                            {editClienteId === cliente.id ? (
                                                <button onClick={() => handleSaveClick(cliente.id)}>Confirmar</button>
                                            ) : (
                                                <button onClick={() => handleEditClick(cliente)}>Editar</button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteClick(cliente.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Clientes;
