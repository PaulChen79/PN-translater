const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require("passport")
const bcrypt = require('bcryptjs')

router.get("/login", (req, res) => {
  res.render('login')
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/products",
  failureRedirect: "/users/login",
  failureFlash: true
}))

router.get("/register", (req, res) => {
  res.render('register')
})

router.post("/register", (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  const errors = []
  if (!username || !email || !password || !confirmPassword) {
    errors.push({ message: "必須填寫所有表格" })
  }
  if (password !== confirmPassword) {
    errors.push({ message: "請確認密碼是否相同" })
  }
  if (errors.length) {
    return res.render("register", { errors, username, email, password, confirmPassword })
  }
  User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ message: "這個 Email 已經被註冊過了" })
        return res.render("register", { errors, username, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash =>
          User.create({ username, email, password: hash })
          .then(() => res.redirect("/"))
          .catch(error => console.log(error))
        )
    })
    .catch(error => console.log(error))
})


router.get('/logout', (req, res) => {
  req.logout()
  req.flash("success_msg", "你已成功登出")
  res.redirect('/users/login')
})

module.exports = router