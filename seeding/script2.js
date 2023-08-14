const mongoose = require("mongoose")
const express=require("express")
const router=express.Router()


const allLegends = require("./legends.json")
const Leyenda = require("../models/Legend.model.js")
const allTeams = require("./teams.json")
const Equipo = require("../models/Team.model.js")

mongoose.connect("mongodb://127.0.0.1:27017/NBA")


function insertLegends() {
    // Insertamos las leyendas desde el archivo legends.json
    return Leyenda.insertMany(allLegends)
      .then(() => {
        console.log("Leyendas insertadas con éxito.");
      })
      .catch((error) => {
        console.error("Error al insertar leyendas:", error);
      })
     
    
  }
  mongoose.disconnect();
  
  // Llamamos a la función para insertar las leyendas
  insertLegends();
  