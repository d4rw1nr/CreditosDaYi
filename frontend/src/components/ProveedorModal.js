function ProveedorModal({ show, onClose, proveedores, onSelect }) {
    if (!show) {
        return null;
    }

    return (
        <div style={overlayStyles}>
            <div className="card" style={modalStyles}>
                <div className="card-header" style={{ position: 'relative' }}>
                    <span className="close" onClick={onClose} style={closeButtonStyles}>&times;</span>
                    <h2 style={{ margin: 0 }}>Seleccionar Proveedor</h2>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Proveedor</th>
                                <th>Nombre Contacto</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Email</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nombre_proveedor}</td>
                                    <td>{p.nombre_contacto}</td>
                                    <td>{p.telefono}</td>
                                    <td>{p.direccion}</td>
                                    <td>{p.email}</td>
                                    <td>
                                        <button onClick={() => onSelect(p.id, p.nombre_proveedor)}>
                                            Seleccionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const modalStyles = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    maxWidth: '700px',
    width: '80%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Esto es clave para posicionar la "X"
};

const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px', // Tamaño de la "X"
    fontWeight: 'bold',
    cursor: 'pointer',
};

export default ProveedorModal;