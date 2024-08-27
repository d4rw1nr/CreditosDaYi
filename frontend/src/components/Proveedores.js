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
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
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
                    </tr>
                </thead>
                <tbody>
                    {filteredProveedores.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre_proveedor}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.nombre_contacto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    );
}

export default Proveedores;
