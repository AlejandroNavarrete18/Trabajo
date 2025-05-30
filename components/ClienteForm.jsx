import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ClienteForm.css';

function ClienteForm({ onClienteAgregado }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoCliente = { nombre, correo, telefono, direccion };
      const response = await axios.post('http://localhost:3000/clientes', nuevoCliente);

      // Si la inserción fue exitosa, limpia el formulario y actualiza lista
      if (response.status === 201 || response.status === 200) {
        setNombre('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
        onClienteAgregado(); // refrescar lista en el componente padre
      }
    } catch (error) {
      console.error('Error al insertar cliente:', error);
      // Puedes agregar aquí un log más detallado si lo deseas
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Cliente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={e => setCorreo(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={e => setDireccion(e.target.value)}
        required
      />
      <button type="submit">Guardar Cliente</button>
    </form>
  );
}

export default ClienteForm;


