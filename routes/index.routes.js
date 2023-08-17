const express = require("express");
const router = express.Router();
const Equipo = require("../models/Team.model.js");
const { updateLocals } = require("../middlewares/auth.middlewares.js");
router.use(updateLocals);
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

const userRouter = require("./user.routes.js");
router.use("/user", userRouter);

const legendRouter = require("./legend.routes.js");
router.use("/mylegend", legendRouter);

const equipoRouter = require("./equipos.routes.js");
const User = require("../models/User.model.js");
router.use("/equipo", equipoRouter);

//routa de conferencias
router.get("/conferencias",isLoggedIn, (req, res, next) => {
  res.render("conferencias");
});
router.get("/eastern",isLoggedIn, (req, res, next) => {
  res.render("eastern");
});

router.get("/eastern",isLoggedIn, (req, res, next) => {
  res.render("eastern");
});

router.get("/western",isLoggedIn, (req, res, next) => {
  res.render("western");
});

//Ruta de pronósticos

router.get("/pronostico",isLoggedIn, (req, res, next) => {
  Equipo.find()
    .select({ nombre: 1 })

    .then((response) => {
      console.log(response);
      res.render("pronostico.hbs", {
        allTeams: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});
//tiene que ir a la base datos y traer el favorito y el pronostico del usuario
router.get("/pronostico-favorito",isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id).populate("pronostico").populate("favorito") 
 .then((response)=>{
console.log(response)
res.render("pronostico-favorito.hbs", {oneUser:response
       
  });
 })

.catch((error)=>{
next(error)})

  
});

//recoge datos del formulario e los introduce en la base de datos
router.post("/pronostico-favorito", (req, res, next) => {
  const championTeams = req.body.teams; // Recuperaipos campeones seleccionados
  const favoriteTeams = req.body.favoriteTeams; // igual que arriba pero de los equipos amados seleccionados
 // console.log(championTeams)
  //console.log(favoriteTeams)
  User.findByIdAndUpdate(req.session.user._id,{pronostico:championTeams})//ide del usuario logueado,propiedd que queremos actualizar del usuario) //recupera los datos de la DB del array championTeams(del equipo seleccionado) buscandolo por ID
    .then(() => {
      // Realiza la lógica para buscar los equipos amados en la base de datos
      User.findByIdAndUpdate(req.session.user._id,{favorito:favoriteTeams}) //lo mismo que en championteams pero de favoriteTeam
        .then(() => {
          res.redirect("/pronostico-favorito")
          //console.log(championTeams)
          //console.log(favoriteTeams)
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
