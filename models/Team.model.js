const { Schema, model } = require("mongoose");

const equipoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    enum: [
      "Boston Celtics",
      "Atlanta Hawks",
      "Brooklyn Nets",
      "Charlotte Hornets",
      "Chicago Bulls",
      "Cleveland Cavaliers",
      "Detroit Pistons",
      "Indiana Pacers",
      "Miami Heat",
      "Milwaukee Bucks",
      "New York Knicks ",
      "Orlando Magic",
      "Philadelphia 76ers",
      "Toronto Raptors",
      "Washington Wizards",
      "Dallas Mavericks",
      "Denver Nuggets",
      "Golden State Warriors",
      "Houston Rockets",
      "Los Angeles Clippers",
      "Los Angeles Lakers",
      "Memphis Grizzlies",
      "Minnesota Timberwolves",
      "New Orleans Pelicans",
      "Oklahoma City Thunders",
      "Phoenix Suns",
      "Portland Trail Blazers",
      "Sacramento Kings",
      "San Antonio Spurs",
      "Utah Jazz",
    ],
  },
  conferencia: {
    type: String,
    enum: ["Eastern", "Western"],
    required: true,
  },
  historia: {
    type: String,
    required: true,
  },
  titulos: {
    type: Number,
    required: true,
  },
  sede: {
    type: String,
    required: true,
  },
  image: {
    type: String, //(url de cloudinary)
  },
});

const Equipo = model("Equipo", equipoSchema);

module.exports = Equipo;
