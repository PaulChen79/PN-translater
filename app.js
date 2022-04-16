require("./config/mongoose")
const express = require("eapress")
const methodOverride = require("method-override")
const exphbs = require("express-handlebars")
const app = express()
const PORT = process.env.PORT || 3000

app.engine("hbs", exphbs.engine({ defaultLayout: main, extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))



app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})