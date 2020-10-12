/* eslint-disable consistent-return */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

exports.isLoggedIn = isLoggedIn;
