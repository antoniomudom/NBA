const mongoose = require("mongoose")
const express=require("express")
const router=express.Router()

const allTeams = require("./teams.json")
const Equipo = require("../models/Team.model.js")

// const allLegends = require("./legends.json")
// const Legend = require("../models/Legend.model.js")

mongoose.connect("mongodb://127.0.0.1:27017/NBA")
.then(() => {
  console.log("conectados a la DB")

  
  return Equipo.insertMany(allTeams)
})
.then(() => {
  console.log("añadidos los equipos, DB inicializada")
})
.catch((error) => {
  console.log(error)
})