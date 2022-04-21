const db = require('../../config/mongoose')
const PN = require("../PN")
const PNSeeds = require('./pn-list.json')

db.once("open", async() => {
  try {
    await Promise.all(
      // 使用forEach不會回傳array物件，必須使用map method
      PNSeeds.map(async pn => {
        await PN.create({
          customerPN: pn.customerPN,
          spec: pn.spec,
          price: pn.price,
          CTIPN: pn.CTIPN
        })
      }))
  } catch (error) {
    console.error(error)
  }
  console.log("PN seeds created!!")
  process.exit()
})