import React, { useState } from 'react';
import ClienteForm from './components/ClienteForm';
import ClientesList from './components/ClientesList';
import './App.css';

const App = () => {
  const [clienteEditar, setClienteEditar] = useState(null);
  const [actualizar, setActualizar] = useState(false);

  const handleEdit = (cliente) => {
    setClienteEditar(cliente);
  };

  const handleSuccess = () => {
    setActualizar(!actualizar);
    setClienteEditar(null);
  };

  return (
    <div className="container">
      <h1>Gestión de Clientes</h1>

      <ClienteForm clienteEditar={clienteEditar} onSuccess={handleSuccess} />
      <ClientesList onEdit={handleEdit} actualizar={actualizar} />
    </div>
  );
};

export default App;

