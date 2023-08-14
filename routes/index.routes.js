const express = require('express');
const router = express.Router();
const Equipo = require("../models/Team.model.js")
const { updateLocals } = require("../middlewares/auth.middlewares.js")
router.use(updateLocals)



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const userRouter = require("./user.routes.js")
router.use("/user", userRouter)

const legendRouter = require("./legend.routes.js")
router.use("/mylegend", legendRouter)


//routa de conferencias
router.get("/conferencias",(req,res,next)=>{
  res.render("conferencias");

})
router.get("/eastern", (req,res,next)=>{
  res.render("eastern")
})

router.get("/western", (req,res,next)=>{
  res.render("western")
})
//Rutas de favorito

router.get("/favorito",(req,res,next)=>{
  res.render("favorito");

})

//Ruta de pronósticos

router.get("/pronostico", (req, res, next) => {
   Equipo.find().select({ nombre: 1 })

   .then((response)=>{
    console.log(response)
    res.render("pronostico.hbs", {
      allTeams: response  })


 
    
    })
   .catch ((error) =>{
    next(error);
  })
});

 

router.get("/favorito", (req, res, next) => {
  Equipo.find().select({ nombre: 1 })

  .then((response)=>{
   console.log(response)
   res.render("favorito.hbs", {
     allTeams: response  })



   
   })
  .catch ((error) =>{
   next(error);
 })
});





module.exports = router;
