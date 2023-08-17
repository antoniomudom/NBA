function isLoggedIn(req, res, next) {

    if (req.session.user === undefined) {
      res.redirect("/auth/login")
    } else {
      next()
    }
  
  }
  
  function isAdmin(req, res, next) {
  
    if (req.session.user.role === "admin") {
      next() 
    } else {
      res.redirect("/auth/login")
    }
  
  }
  
  
  function updateLocals(req, res, next) {
  
    if (req.session.user === undefined) {
      // creo una variable local que indique que no dentro
      res.locals.isUserActive = false;
    } else {
      // creo una variable local que indique que si está dentro
      res.locals.isUserActive = true;
      if(req.session.user.role==="admin"){
          res.locals.isUserAdmin=true
      }
    }
  
    next() // despues de actualizar la variable, continua con las rutas
  }
  
  
  module.exports = {
    isLoggedIn: isLoggedIn,
    updateLocals: updateLocals,
    isAdmin: isAdmin
  }