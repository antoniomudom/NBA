const express = require("express");
const router = express.Router();
const Leyenda = require("../models/Legend.model.js");
const Equipo = require("../models/Team.model.js");

//creacion de leyenda
router.get("/mylegend", (req, res, next) => {
  res.render("mylegend");
});

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
      ProfilePic: req.body.ProfilePic,
    });
    res.redirect("/mylegend");
  } catch (error) {
    next(error);
  }
});

router.get("/legend", async (req, res, next) => {
  try {
    const response = await legend.find().select({ name: 1 });
    res.render("legend-list.hbs", {
      allLegend: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
