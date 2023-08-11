const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js")
const uploader = require("../middlewares/cloudinary.middlewares.js")

//ruta del usuario
router.get("/", isLoggedIn, (req, res, next) => {
User.findById(req.session.user._id)
.then((response) => {

  res.render("user-profile.hbs", {
    user: response
  })

})
.catch((error) => {
  next(error)
})
})




//ruta administradores
router.get("/admin", isLoggedIn,isAdmin, (req, res, next) => {
    res.render("admin-only.hbs")
})

module.exports = router;