const express = require('express');
const bodyParser = require('body-parser');
const clientes  = require('./clientes'); // Importar el modelo de clientes
const app = express();
const cors = require('cors');
const puerto = 3000;
app.use(cors());
app.use(bodyParser.json());

app.listen(puerto, () => {
    console.log('Servicio iniciado');
});

// Crear un nuevo cliente
app.post('/clientes', async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;

    try {
        const nuevoCliente = await clientes.create({ nombre, correo, telefono, direccion });
        res.status(201).send(nuevoCliente);
    } catch (error) {
        res.status(400).send({ error: 'No se pudo crear el cliente', detalles: error.message });
    }
});

// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
    const data = await clientes.findAll();
    res.send(data);
});

// Editar un cliente existente
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, direccion } = req.body;

    try {
        const cliente = await clientes.findByPk(id);
        
        if (!cliente) {
            return res.sendStatus(404);
        }

        cliente.nombre = nombre || cliente.nombre;
        cliente.correo = correo || cliente.correo;
        cliente.telefono = telefono || cliente.telefono;
        cliente.direccion = direccion || cliente.direccion;

        await cliente.save();
        res.send(cliente);
    } catch (error) {
        res.status(400).send({ error: 'No se pudo actualizar el cliente', detalles: error.message });
    }
});

// Eliminar un cliente
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await clientes.findByPk(id);

        if (!cliente) {
            return res.sendStatus(404);
        }

        await cliente.destroy();
        res.send({ mensaje: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).send({ error: 'No se pudo eliminar el cliente', detalles: error.message });
    }
});