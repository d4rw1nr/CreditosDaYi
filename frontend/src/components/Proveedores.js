import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Proveedores() {
    const [nombre_proveedor, setNombreProveedor] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [nombre_contacto, setNombreContacto] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editProveedorId, setEditProveedorId] = useState(null);
    const [editData, setEditData] = useState({ nombre_proveedor: '', direccion: '', telefono: '', email: '', nombre_contacto: ''});

    // fetch inicial de la tabla de clientes
    useEffect(() => {
      // Obtener la lista de proveedores cuando el componente se monta
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/inventario/proveedores/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setProveedores(response.data);
            } catch (error) {
                console.error('Error fetching proveedores', error);
            }
        };

        fetchProveedores();
  }, []); // El array vacío [] significa que esto se ejecuta solo una vez cuando el componente se monta

  // post para agregar cliente
    const handleSubmit = async (e) => {
        e.preventDefault();

    const newProveedor = {
        nombre_proveedor,
        direccion,
        telefono,
        email,
        nombre_contacto
    };

    try {
        const response = await axios.post('http://localhost:8000/api/inventario/proveedores/', newProveedor, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        setProveedores([...proveedores, response.data]); // Agregar el nuevo cliente a la lista existente
        setNombreProveedor('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setNombreContacto('');
    } catch (error) {
        console.error('Error creating cliente', error);
    }
};


const handleEditClick = (proveedor) => {
    setEditProveedorId(proveedor.id);
    setEditData({
        nombre_proveedor: proveedor.nombre_proveedor,
        direccion: proveedor.direccion,
        telefono: proveedor.telefono,
        email: proveedor.email,
        nombre_contacto: proveedor.nombre_contacto
    });
};

const handleSaveClick = async (id) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/inventario/proveedores/${id}/`, editData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        setProveedores(proveedores.map(proveedor => proveedor.id === id ? response.data : proveedor));
        setEditProveedorId(null);  // Exit edit mode
    } catch (error) {
        console.error('Error saving Proveedor', error);
    }
};

const handleDeleteClick = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        try {
            await axios.delete(`http://localhost:8000/api/inventario/proveedores/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
        } catch (error) {
            console.error('Error deleting proveedor', error);
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
    const filteredProveedores = proveedores.filter(proveedores =>
    proveedores.nombre_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedores.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedores.telefono.toString().includes(searchTerm) ||
    proveedores.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedores.nombre_contacto.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <a class="nav-link" href="/clientes">Clientes</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true" href="/proveedores">Proveedores</a>
                  </li>
                </ul>
                </div>
            </div>
        </nav>
    
        <div>
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Registrar Proveedor</h2>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px'}}>
                            <label style={{ marginRight: '10px', marginLeft: '20px' }}>Nombre:</label>
                            <input
                                type="text"
                                value={nombre_proveedor}
                                onChange={(e) => setNombreProveedor(e.target.value)}
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

                        <br></br>
                        <br></br>

                        <label style={{ marginRight: '10px', marginLeft: '20px' }}>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        
                        <label style={{ marginRight: '10px', marginLeft: '20px' }}>Nombre Contacto:</label>
                        <input
                            type="text"
                            value={nombre_contacto}
                            onChange={(e) => setNombreContacto(e.target.value)}
                            required
                        />
                        <button type="submit" style={{ marginLeft: '20px' }}>Crear Proveedor</button>
                    </div>
                    </form>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">Buscar Proveedor</h2>
                        <input style={{width: '700px'}}
                            type="text"
                            placeholder="Buscar por nombre, dirección, teléfono o email"
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
                                <th>Nombre Prooveedor</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Nombre Contacto</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProveedores.map((proveedor) => (
                                <tr key={proveedor.id}>
                                    <td>{proveedor.id}</td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <input
                                                type="text"
                                                name="nombre_proveedor"
                                                value={editData.nombre_proveedor}
                                                onChange={handleChange}
                                            />
                                        ) : (proveedor.nombre_proveedor)}
                                    </td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <input
                                                type="text"
                                                name="direccion"
                                                value={editData.direccion}
                                                onChange={handleChange}
                                            />
                                        ) : (proveedor.direccion)}
                                    </td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <input
                                                type="text"
                                                name="telefono"
                                                value={editData.telefono}
                                                onChange={handleChange}
                                            />
                                        ) : (proveedor.telefono)}
                                    </td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <input
                                                type="text"
                                                name="email"
                                                value={editData.email}
                                                onChange={handleChange}
                                            />
                                        ) : (proveedor.email)}
                                    </td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <input
                                                type="text"
                                                name="nombre_contacto"
                                                value={editData.nombre_contacto}
                                                onChange={handleChange}
                                            />
                                        ) : (proveedor.nombre_contacto)}
                                    </td>
                                    <td>
                                        {editProveedorId === proveedor.id ? (
                                            <button onClick={() => handleSaveClick(proveedor.id)}>Confirmar</button>
                                        ) : (
                                            <button onClick={() => handleEditClick(proveedor)}>Editar</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteClick(proveedor.id)}>Eliminar</button>
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

export default Proveedores;
