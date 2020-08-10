// route middleware to make sure user is autenticated and loggen in

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  res.redirect('/')
}

function isSelf(req, res, next) {
  console.log("req.params.userId",req.params.userId)
  console.log("req.user.dataValues.id",req.user.dataValues.id)
  if (req.params.userId == req.user.dataValues.id) return next()
  res.redirect('/')
}

module.exports = {
  isAdmin,
  isSelf,
}
