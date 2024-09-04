import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProveedorModal from './ProveedorModal';

function Inventario() {
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [detalle, setDetalle] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [id_proveedor, setIdProveedor] = useState(null);
  const [proveedorNombre, setProveedorNombre] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductoId, setEditProductoId] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', marca: '', detalle: '', precio: '', cantidad: '', proveedor_id: '' });
  const [showProveedorModal, setShowProveedorModal] = useState(false);

  // Fetch de proveedores
  useEffect(() => {
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
  }, []);

  // Fetch de productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/inventario/productos/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching productos', error);
      }
    };
    fetchProductos();
  }, []);

  // Al seleccionar un proveedor
  const handleProveedorSelect = (id, nombre) => {
    setIdProveedor(id);
    setProveedorNombre(nombre);
    setShowProveedorModal(false);
  };

  // Al crear un nuevo producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProducto = {
      nombre,
      marca,
      detalle,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad, 10),
      proveedor_id: id_proveedor
    };

    try {
      const response = await axios.post('http://localhost:8000/api/inventario/productos/', newProducto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setProductos([...productos, response.data]);
      // Limpiar los campos
      setNombre('');
      setMarca('');
      setDetalle('');
      setPrecio('');
      setCantidad('');
      setIdProveedor(null);
      setProveedorNombre('');
    } catch (error) {
      console.error('Error creating producto', error.response?.data || error);  // Verifica el error exacto
    }
  };

  // Al editar un producto
  const handleEditClick = (producto) => {
    setEditProductoId(producto.id);
    setEditData({
      nombre: producto.nombre,
      marca: producto.marca,
      detalle: producto.detalle,
      precio: producto.precio,
      cantidad: producto.cantidad,
      proveedor_id: producto.proveedor.id  // Almacena el ID del proveedor
    });
  };

  // Al guardar los cambios del producto editado
  const handleSaveClick = async (id) => {
    const updatedProducto = {
      ...editData,
      proveedor_id: editData.proveedor_id  // Usar el ID del proveedor al actualizar
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/inventario/productos/${id}/`, updatedProducto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      setProductos(productos.map(producto => producto.id === id ? response.data : producto));
      setEditProductoId(null);
    } catch (error) {
      console.error('Error saving producto', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:8000/api/inventario/productos/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        setProductos(productos.filter(producto => producto.id !== id));
      } catch (error) {
        console.error('Error deleting producto', error);
      }
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.detalle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">Creditos DaYi</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/ventas">Ventas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true" href="/inventario">Inventario</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/clientes">Clientes</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/proveedores">Proveedores</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <br></br>
      <div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Registrar Producto</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', marginLeft: '20px' }}>Proveedor:</label>
                <input
                  type="text"
                  value={proveedorNombre}
                  readOnly
                  style={{ marginRight: '10px' }}
                  placeholder="Seleccione un proveedor"
                  required
                />
                <button type="button" onClick={() => setShowProveedorModal(true)}>
                  Buscar Proveedor
                </button>
                <br></br> <br></br>
                <label style={{ marginRight: '10px', marginLeft: '20px' }}> Nombre: </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />

                <label style={{ marginRight: '10px', marginLeft: '20px' }}>Marca:</label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  required
                />

                <label style={{ marginRight: '10px', marginLeft: '20px' }}>Detalle:</label>
                <input
                  type="text"
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  required
                />
                <br></br> <br></br>
                <label style={{ marginRight: '10px', marginLeft: '20px' }}>Precio:</label>
                <input
                  type="integer"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />

                <label style={{ marginRight: '10px', marginLeft: '20px' }}>Cantidad:</label>
                <input
                  type="integer"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />

                <button type="submit" style={{ marginLeft: '20px' }}>Agregar Producto</button>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Buscar Producto</h2>
            <input style={{ width: '700px' }}
              type="text"
              placeholder="Buscar por nombre, marca, detalle o proveedor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="card border border-0">
          <div className="card-body">
            <h2 className="card-title">Lista de Productos</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Detalle</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Proveedor</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProductos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>
                      {editProductoId === producto.id ? (
                        <input
                          type="text"
                          name="nombre"
                          value={editData.nombre}
                          onChange={handleChange}
                        />
                      ) : (producto.nombre)}
                    </td>
                    <td>
                      {editProductoId === producto.id ? (
                        <input
                          type="text"
                          name="marca"
                          value={editData.marca}
                          onChange={handleChange}
                        />
                      ) : (producto.marca)}
                    </td>
                    <td>
                      {editProductoId === producto.id ? (
                        <input
                          type="text"
                          name="detalle"
                          value={editData.detalle}
                          onChange={handleChange}
                        />
                      ) : (producto.detalle)}
                    </td>
                    <td>
                      {editProductoId === producto.id ? (
                        <input
                          type="integer"
                          name="precio"
                          value={editData.precio}
                          onChange={handleChange}
                        />
                      ) : (producto.precio)}
                    </td>
                    <td>
                      {editProductoId === producto.id ? (
                        <input
                          type="integer"
                          name="cantidad"
                          value={editData.cantidad}
                          onChange={handleChange}
                        />
                      ) : (producto.cantidad)}
                    </td>
                    <td>{producto.proveedor?.nombre_proveedor || 'Sin proveedor'}</td>
                    <td>
                      {editProductoId === producto.id ? (
                        <button onClick={() => handleSaveClick(producto.id)}>Confirmar</button>
                      ) : (
                        <button onClick={() => handleEditClick(producto)}>Editar</button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeleteClick(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ProveedorModal
        show={showProveedorModal}
        onClose={() => setShowProveedorModal(false)}
        proveedores={proveedores}
        onSelect={handleProveedorSelect}
      />
    </div>
  );
}

export default Inventario;
