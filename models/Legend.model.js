const { Schema, model } = require("mongoose");

const leyendaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  temporadas: {
    type: Number,
    required: true
  },
  titulos: {
    type: Number,
    required: true
  },
  Equipo: {
    type: Schema.Types.ObjectId,
    ref: "Equipo"
  },
creator:{
type: String, 
    enum: ["admin", "user"], 
    default:"user"
  },


ProfilePic: {
          
type: String, //(url de cloudinary)
}


});

const Leyenda = model("Leyenda", leyendaSchema);

module.exports = Leyenda;
