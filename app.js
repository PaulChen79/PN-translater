require("./config/mongoose")
const express = require("express")
const session = require("express-session")
const usePassport = require("./config/passport")
const flash = require("connect-flash")
const methodOverride = require("method-override")
const exphbs = require("express-handlebars")
const routes = require("./routes/index")
const app = express()
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
require('./config/mongoose')
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(methodOverride("_method"))


usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash("success_msg")
  res.locals.warning_msg = req.flash("warning_msg")
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})