// route middleware to make sure user is autenticated and loggen in

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  res.redirect('/')
}

module.exports = {
  isAdmin
}
