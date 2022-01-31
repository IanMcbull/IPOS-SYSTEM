const UserLocal = require("../models/userlocal");
const registerRoute = require("express").Router();
const bcrypt = require("bcryptjs");

registerRoute.get("/", (req, res) => {
  res.render("register");
});
registerRoute.post("/", (req, res) => {
  const { username, email, password } = req.body;
 
  UserLocal.findOne({ email })
    .then((user) => {
      if (user) {
        let errors = [];
         errors.push({msg:'That email has already been registered'})
        res.render("register",{errors});
      } else {
        const newuser = new UserLocal({ name: username, email, password });
        // hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            newuser
              .save()
              .then((user) => {
                  req.flash('success_msg','Account successfully created, you can now log in')
                  res.redirect("/");
              })
              .catch((err) => {
                console.log("Something went wrong");
              });
          });
        });
      }
    })
    .catch((err) => {
      res.json({ msg: "Something went wrong" });
    });
});

module.exports = registerRoute;
