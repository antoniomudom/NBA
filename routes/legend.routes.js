const express = require("express");
const router = express.Router();
const Leyenda = require("../models/Legend.model.js");
const Equipo = require("../models/Team.model.js");

//creacion de leyenda
router.get("/", (req, res, next) => {
  console.log("hola")
    res.render("mylegend.hbs"); 
  })
  

router.post("/mylegend", async (req, res, next) => {
  console.log(req.body);

  // validaciones
  if (
    req.body.nombre === "" ||
    req.body.temporadas === "" ||
    req.body.titulos === "" ||
    req.body.equipo === "" ||
    req.body.ProfilePic === ""
  ) {
    console.log("hay algo vacio");
    res.status(400).render("/mylegend", {
      errorMessage: "rellenar todo",
    });
    return; // esto detiene ruta
  }

  try {
    await Leyenda.create({
      nombre: req.body.nombre,
      temporadas: req.body.temporadas,
      titulos: req.body.titulos,
      equipo: req.body.equipo,
      //ProfilePic: req.body.ProfilePic,
    });
    res.redirect("/mylegend-list");
  } catch (error) {
    next(error);
  }
});

router.get("/legend",(req, res, next) => {
  Equipo.find().select({ nombre: 1 })

   .then((response)=>{
    console.log(response)
    res.render("mylegend.hbs", {
      allTeams: response  })


 
    
    })
   .catch ((error) =>{
    next(error);
  })
});
module.exports = router;
