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
//hay que darle el nombre del campo donde viene la imagen(profilePic)
router.post("/upload-profile-pic", uploader.single("profilePic"),  (req, res, next) => {
  //  recibimos la imagen
  // esa imagen la pasamos a cloudinary

  // cloudinary nos devuelve el URL de acceso
  console.log(req.file)

  // buscar el usuario que está subiendo esa imagen, actualizarlo y cambiar su profilePic por el req.file.path de cloudinary
  User.findByIdAndUpdate( req.session.user._id, {
    profilePic: req.file.path
  } )
  .then(() => {
    res.redirect("/user")
  })
  .catch((error) => {
    next(error)
  })

})

module.exports = router;