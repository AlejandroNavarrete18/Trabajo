import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ClientesList.css';

const ClientesList = ({ onEdit, actualizar }) => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/clientes');
      setClientes(res.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [actualizar]);

  const eliminarCliente = async (id) => {
    await axios.delete(`http://localhost:3000/clientes/${id}`);
    fetchClientes();
  };

  return (
    <div className="lista-clientes">
      <h2>Clientes Registrados</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <span><strong>{cliente.nombre}</strong></span>
            <span>{cliente.correo}</span>
            <span>{cliente.telefono}</span>
            <span>{cliente.direccion}</span>
            <div className="acciones">
              <button onClick={() => onEdit(cliente)}>Editar</button>
              <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
