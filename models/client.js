const mongoose = require('mongoose');
const ClientSchema = new mongoose.Schema({
    clientName:{
        type: String,
        required: true
    },
    businessName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    locations:{
        street: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: false
        }
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;