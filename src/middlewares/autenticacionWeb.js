// export function onlyAuthenticated(req, res, next) {
//   if (req.session.user) {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// }

export function onlyAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
      return res.redirect('/login')
  }
  next()
}