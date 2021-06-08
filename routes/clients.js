const { Router, response } = require('express');
const express = require('express');
const Client = require('../models/client.js');
const router = express.Router();
 //Al estar el filtro vacio, trae todo
(async function () {
    const clients = await Client.find({});
})();

const clients = {}



router.get('/clients/home', (req, res) => {
    response.send(clients);
})

router.post('/clients/addClient', (req, res) => {
    const client = {
        clientName: req.body.clientName,
        businessName: req.body.businessName,
        email: req.body.email,
        locations: {
            street: req.body.locations.street,
            country: req.body.locations.country,
            province: req.body.locations.province,
            postalCode: req.body.locations.postalCode
        }
    }
    clients.push(client);
    response.status(200).send(client)
})



module.exports = router;
