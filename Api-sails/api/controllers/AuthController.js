/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: function (req, res) {
    if (
      req.body.password === req.session.user.password &&
      req.body.username === req.session.user.username
    ) {
      res.redirect('/')
    } else {
      res.redirect('/failLogin')
    }
    console.log(req.session.user.password)
  },
  register: function (req, res) {
    req.session.user = req.body
    res.redirect('/login')
  },
  index: function (req, res) {
    if (!req.session.user) {
      res.redirect('/login')
    } else {
      res.render('./pages/index', { user: req.session.user })
    }
  },
  logout: function (req, res) {
    req.session.destroy()
    res.redirect('/login')
  },
  productos: function (req, res) {
    res.redirect('/')
  },
  pay: async function (req, res) {
    const emailAdmin = 'delia95@ethereal.email'
    const nodeMailer = require('nodemailer')
    const transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'delia95@ethereal.email',
        pass: '5GqAq1ZCqtTpPjq6jg'
      }
    })
    const emailOptions = {
      from: 'Servidor Node.js',
      to: emailAdmin,
      subject: 'Compra nueva registrada',
      html: `<div>
            <h1>Compra nueva registrada</h1>
        </div>`
    }
    await transporter.sendMail(emailOptions)
    res.redirect('/')
  }
}
