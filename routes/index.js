const express = require('express');
const router = express.Router();
const login = require('./modules/login')
const register = require('./modules/register')
const products = require('./modules/products')
const newPN = require('./modules/new')

router.use("/", login)
router.use("/register", register)
router.use("/products", products)
router.use("/new", newPN)


module.exports = router