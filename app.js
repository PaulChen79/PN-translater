require("./config/mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const exphbs = require("express-handlebars")
const routes = require("./routes/index")
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(methodOverride("_method"))

app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})