const express = require("express");
const router = express.Router();
const Leyenda = require("../models/Legend.model.js");
const Equipo = require("../models/Team.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js")

  
//ruta post a /mylegend/mylegend
router.post("/mylegend",isLoggedIn, async (req, res, next) => {
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
      Equipo: req.body.equipo,
      //ProfilePic: req.body.ProfilePic,
    });
    res.redirect("/mylegend/legend-list");
  } catch (error) {
    next(error);
  }
});

//formulario de leyendas (busca equipo) ruta a mylegend/legend
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





router.get("/legend-list",isLoggedIn, async (req, res, next) => {
  try {
    const leyendas = await Leyenda.find();
    res.render("legend-list.hbs", { leyendas });
  } catch (error) {
    next(error);
  }
});

// Ver propiedades de una leyenda
router.get("/legend-details/:id",isLoggedIn, async (req, res, next) => {
  try {
const leyenda = await Leyenda.findById(req.params.id).populate("Equipo");
    if     (!leyenda) {
      res.status(404).send("Leyenda no encontrada");
      return;
    }
    res.render("legend-details.hbs", { leyenda });
  } catch (error) {
    next(error);
  }
});
router.get("/legend-edit/:id",isLoggedIn, async(req,res,next)=>{
 
  try {
    const allTeams= await  Equipo.find().select({ nombre: 1 });
    const leyenda = await Leyenda.findById(req.params.id).populate("Equipo");
        // if     (!leyenda) {
        //   res.status(404).send("Leyenda no encontrada");
          // return;
        // }
        res.render("legend-edit.hbs", { leyenda,allTeams });
      } catch (error) {
        next(error);
      }

})
router.post("/legend-edit/:id", async (req, res, next) => {
  try {
    const { nombre, temporadas, titulos, Equipo } = req.body;
    await Leyenda.findByIdAndUpdate(req.params.id, {
      nombre,
      temporadas,
      titulos,
      Equipo,
    });
    res.redirect(`/mylegend/legend-details/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

router.get("/legend-details/:id",isLoggedIn, async (req, res, next) => {
  try {
    const leyenda = await Leyenda.findById(req.params.id).populate("Equipo");
    res.render("legend-details.hbs", { leyenda });
  } catch (error) {
    next(error);
  }
});

// Acción de eliminar leyenda (POST)
router.post("/legend-delete/:id",isLoggedIn, async (req, res, next) => {
  try {
    await Leyenda.findByIdAndDelete(req.params.id);
    res.redirect("/mylegend/legend-list");
  } catch (error) {
    next(error);
  }
});





module.exports = router;
