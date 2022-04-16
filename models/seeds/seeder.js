const db = require('../../config/mongoose')
const PN = require("../PN")
const PNSeeds = require('./pn-list.json')

db.once("open", () => {
    try {
        PNSeeds.forEach(pn => {
            PN.create({
                customerPN: pn.customerPN,
                spec: pn.spec,
                price: pn.price,
                CTIPN: pn.CTIPN
            })
        })
    } catch (error) {
        console.error(error)
    }
    console.log("PN seeds created!!")
})