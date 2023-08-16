const express = require("express");
const router = express.Router();
const Equipo = require("../models/Team.model.js");
const { updateLocals } = require("../middlewares/auth.middlewares.js");
router.use(updateLocals);

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
router.get("/conferencias", (req, res, next) => {
  res.render("conferencias");
});
router.get("/eastern", (req, res, next) => {
  res.render("eastern");
});

router.get("/eastern", (req, res, next) => {
  res.render("eastern");
});

router.get("/western", (req, res, next) => {
  res.render("western");
});

//Ruta de pronósticos

router.get("/pronostico", (req, res, next) => {
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

router.get("/pronostico-favorito", (req, res, next) => {
  // Realiza la lógica para obtener los datos guardados
  res.render("pronostico-favorito.hbs", {
    championTeams: [], // aqui va el equipo que creemos que va a salir campeón. Si fuera fútbol sería el Sevilla FC
    favoriteTeams: [], // aqui dentro va el dato del equipo favorito
  });
});

router.post("/pronostico-favorito", (req, res, next) => {
  const championTeams = req.body.teams; // Recupera id de los equipos campeones seleccionados
  const favoriteTeams = req.body.favoriteTeams; // igual que arriba pero de los equipos amados seleccionados
  console.log(championTeams)
  console.log(favoriteTeams)
  User.findByIdAndUpdate(req.session.user._id,{pronostico:championTeams})//ide del usuario logueado,propiedd que queremos actualizar del usuario) //recupera los datos de la DB del array championTeams(del equipo seleccionado) buscandolo por ID
    .then((championTeamsData) => {
      // Realiza la lógica para buscar los equipos amados en la base de datos
      User.findByIdAndUpdate(req.session.user._id,{favorito:favoriteTeams}) //lo mismo que en championteams pero de favoriteTeam
        .then((favoriteTeamsData) => {
          res.render("pronostico-favorito.hbs", {
            championTeams: championTeamsData,
            favoriteTeams: favoriteTeamsData,
          });
          console.log(championTeams)
          console.log(favoriteTeams)
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
