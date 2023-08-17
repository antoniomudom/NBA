const express = require("express");
const router = express.Router();
const Equipo = require("../models/Team.model.js");
const Leyenda = require("../models/Legend.model.js");

router.get("/:nombre", (req, res, next) => {
  const nombreEquipo = req.params.nombre;

  Equipo.findOne({ nombre: nombreEquipo })
    .then((equipo) => {
      Leyenda.find({ Equipo:equipo._id})//porpiedad de leyenda
      .then((leyendaArr) =>{
        console.log(leyendaArr)

          res.render("detallesEquipo", { equipo, leyendaArr});
      })


      

    })
    .catch((error) => {
      next(error);
    });
});



module.exports = router;
