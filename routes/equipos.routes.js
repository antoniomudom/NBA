const express = require("express");
const router = express.Router();
const Equipo = require("../models/Team.model.js");
const Leyenda = require("../models/Legend.model.js");

router.get("/:nombre", (req, res, next) => {
  const nombreEquipo = req.params.nombre;

  Equipo.findOne({ nombre: nombreEquipo })
    .then((equipo) => {
      res.render("detallesEquipo", { equipo });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:nombre", (req, res, next) => {
  Leyenda.findById(req.Equipo.nombre)
 .then((response)=>{
console.log(response)
res.render("detallesEquipo", {response
       
  });
 })

.catch((error)=>{
next(error)})

  
});

module.exports = router;
