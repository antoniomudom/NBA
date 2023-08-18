NOTE: to copy this readme structure simply click on `Raw` on the top right of this gist. There you have the content in the basic [Markdown syntax](https://www.markdownguide.org/basic-syntax/) used in readme files. Then paste it on a README.md file in your repository and fill the information. Always do this directly from VS code, not from github. DON'T ADD THIS NOTE TO YOUR README. Also make sure to remove any notes from this template.

# NBA

## [See the App!](https://nba-app.adaptable.app/)

## Description

Plataforma con los equipos de la NBA, su historia,títulos y jugadores leyenda.

## User Stories

**NOTE -** List here all the actions a user can do in the app. Example:

- **homepage** - Como usuario se puede ver la página home con tres accesos: Home, registrarse y Entrar.
- **Registrarse** -El usuario puede registrarse con un formulario d etres campos.
- **login** - El usuario puede hacer login introduciendo su email y contraseña.
- **logout** - El usuario puede salir de la sesión cuando quiera.
- **crear leyendas** - Como usuario pueden crear leyendas pero para eliminarlas hay que ser user.
- **editar leyendas** - COmo usuario puedes editar leyendas.
- **Añadir pronóstico y favorito** -El usuario puede elegir su equipo favorito y el equipo que cree que será campeón.

## Backlog Functionalities

-Crear leyendas
-Editar leyendas
-Eliminar Leyendas (solo el admin)
-Crear pronóstico
-Crear favorito

## Technologies used

HTML
CSS
Javascript
Node
Express
Handlebars
Sessions
bootstrap
MongoDB


## Models

USER MODEl
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profilePic: {
      type: String, //url clouding
    },
    favorito: {
      type: Schema.Types.ObjectId,
      ref: "Equipo",
    },
    pronostico: {
      type: Schema.Types.ObjectId,
      ref: "Equipo",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

TEAM MODEL

onst equipoSchema = new Schema({
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
    type: String, 
  },
});

LEGEND MODEL

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

## Links

## Collaborators

[Luis Cortés](https://github.com/LuisCortesPrg/Ironhack-work)

[Antonio Muñoz](https://github.com/antoniomudom)

### Project

[Repository Link](https://github.com/antoniomudom/NBA)

[Deploy Link](https://nba-app.adaptable.app/)


