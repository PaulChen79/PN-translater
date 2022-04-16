const mongoose = require('mongoose')

const PNSchema = new mongoose.Schema({
    customerPN: {
        type: String,
        require: true
    },
    spec: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    CTIPN: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("PN", PNSchema)