const User = require("../../sources/users");
const bycypt = require("bcrypt");

const locals = {
  title: "Logins",
  layout: "./layouts/default",
  error: false,
};

exports.login = (req, res) => {
  res.render("pages/auth/login", locals);
};

exports.login_store = (req, res) => {
  if (
    req.body.username === User.username &&
    bycypt.compareSync(req.body.password, User.password)
  ) {
    locals.error = false;
    User.login = true;
    res.redirect("/");
  } else {
    locals.error = true;
    User.login = false;
    res.render("pages/auth/login", locals);
  }
};

exports.logout = (req, res) => {
  locals.error = false;
  User.login = false;
  res.render("pages/auth/login", locals);
};
