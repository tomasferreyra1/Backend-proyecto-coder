/* eslint-disable no-undef */
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user)
}
passport.use('login', new LocalStrategy(async (username, password, done) => {
  const usuario = await servicio.obtenerUsuario(username)
  if (!usuario) {
    return done(null, false)
  }
  if (isValidPassword(usuario.password, password)) {
    return done(null, username)
  } else {
    return done(null, false)
  }
}
))
passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  const usuario = await servicio.obtenerUsuario(username)
  if (usuario) {
    return done(null, false)
  } else {
    const passwordEncrypted = await bcrypt.hash(password, 10)
    const newUser = {
      email: username,
      password: passwordEncrypted,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono
    }
    await sendEmail('register', req.body)
    await servicio.guardarUsuario(newUser)
    return done(null, newUser.email)
  }
}))
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((username, done) => {
  servicio.obtenerUsuario(username).then(usuario => {
    done(null, usuario)
  })
})
