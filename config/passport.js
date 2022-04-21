const passport = require("passport")
const bycrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
  // const GoogleStrategy = require("passport-google-oauth").GoogleStrategy

const User = require("../models/user")

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({
    usernameField: "email",
    passReqToCallback: true,
    session: false
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "這個 Email 尚未註冊過" })
        }
        return bycrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: "密碼輸入錯誤" })
          }
          return done(null, user)
        })
      })
      .catch(error => console.log(error))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ["email", "displayName"]
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bycrypt.genSalt(10)
          .then(salt => bycrypt.hash(randomPassword, salt))
          .then(hash => User.create({ username: name, email, password: hash }))
          .then(user => done(null, user))
          .catch(error => console.log(error))
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log(error))
  })
}