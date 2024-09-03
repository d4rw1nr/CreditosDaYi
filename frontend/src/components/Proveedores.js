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
    <div>
        <h2>Registrar Proveedor</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre Proveedor:</label>
                <input
                    type="text"
                    value={nombre_proveedor}
                    onChange={(e) => setNombreProveedor(e.target.value)}
                    required
                />

                <label>Direcci&oacute;n:</label>
                <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />

                <label>Tel&eacute;fono:</label>
                <input
                    type="integer"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <label>Nombre Contacto:</label>
                <input
                    type="text"
                    value={nombre_contacto}
                    onChange={(e) => setNombreContacto(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Crear Proveedor</button>
        </form>

        <h2>Buscar Proveedor</h2>
            <input
                type="text"
                placeholder="Buscar por nombre, dirección, teléfono o email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
            />

        <h2>Lista de Clientes</h2>
            <table>
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
    );
}

export default Proveedores;
