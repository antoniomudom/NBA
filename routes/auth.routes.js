const express= require("express")
const router=express.Router()
const User = require("../models/User.model.js")
const bcrypt = require("bcryptjs")

router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
  })

  // POST "/auth/signup" => recibir la info del usuario y crearlo en la DB
router.post("/signup", async (req, res, next) => {
    console.log(req.body)
    const { username, email, password } = req.body

    if (username === "" || email === "" || password === "") {
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "Rellene todos los campos"
      })
      return; // detener 
    }
    //validaciones de contraseña
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (regexPassword.test(password) === false) {
        console.log("contraseña mal")
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "La contraseña debe tener al menos, una mayuscula, una minuscula, un caracter especial y tener 8 caracteres o más"
      })
      return; // deten la ejecucion 
    }
    //evitar duplicacion de usuario
    try {
 
        const foundUser = await User.findOne({$or: [{email: email}, {username: username}]})
        console.log(foundUser)
        if (foundUser !== null) {
          res.status(400).render("auth/signup.hbs", {
            errorMessage: "Ya existe un usuario con ese nombre o email"
          })
          return; // deten la ejecucion
        }
        //encriptamos la contraseña
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
            
        await User.create({
          username: username,
          email: email,
          password: passwordHash
        })
        res.redirect("/auth/login")
    } catch (error) {
      next(error)
    }
})
    //renderiza formulario de acceso
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs")
})

//recibir los datos del usuario y validarlo/autenticarlo
router.post("/login", async (req, res, next) => {

  console.log(req.body)
  const { email, password } = req.body
  
  try {
    // buscar un usuario x email
    const foundUser = await User.findOne({ email: email })
    console.log("foundUser", foundUser)
    if (foundUser === null) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Usuario no existe con ese correo"
      })
      return; // parar
    }
       //validar contraseña
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    console.log(isPasswordCorrect) // true or false

    if (isPasswordCorrect === false) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Contraseña no valida"
      })
      return; // detener 
    }

    //sesion abierta
    req.session.user = {
        _id: foundUser._id,
        email: foundUser.email,       
        role: foundUser.role
      }
    //iniciamos sesion en express y mongo
    
    req.session.save(() => {
    if (foundUser.role === "admin"){
    res.redirect("/user/admin")}
    else{
        res.redirect("/user")
    }
    })
  
    
    } catch (error) {
      next(error)
    }
  
  })

  //cerrar sesion
  router.get("/logout", (req, res, next) => {

    req.session.destroy(() => {
      res.redirect("/")
    })
  
  })



module.exports=router;