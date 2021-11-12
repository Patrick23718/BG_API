'use strict';
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
// const cookieParser = require('cookie-parser');
// const csurf = require('csurf'); 

const config = require('./config');

mongoose.connect(
  //process.env.DB_CONNECT_URL,
  "mongodb+srv://patrick:patson@cluster0.fswhs.mongodb.net/BiGooDee?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(()=> console.log("Connexion a la base de donnees reussie")).catch(err => console.log(err));
// const csrfMiddleware = csurf({ cookie: true });
// const parseForm = bodyparser.urlencoded({ extended: false })

const UtilisateurRoute = require('./Routes/UtilisateurRoute');
const PrestationRoute = require('./Routes/PrestationRoute');
const GalerieRoute = require('./Routes/GalerieRoute');
const AvisRoute = require('./Routes/AvisRoute');
const PlaningRoutes = require('./Routes/PlaningRoute');
const TchatRoutes = require('./Routes/TchatRoute');
const VilleRoutes = require('./Routes/VilleRoute');
const TarifRoutes = require('./Routes/TarificationRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// app.use(cookieParser());
// app.use(csrfMiddleware);

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });



app.use('/api', UtilisateurRoute.routes);
app.use('/prestation', PrestationRoute.routes);
app.use('/galerie', GalerieRoute.routes);
app.use('/avis', AvisRoute.routes);
app.use("/planing", PlaningRoutes.routes)
app.use('/tchat', TchatRoutes.routes)
app.use('/ville', VilleRoutes.routes)
app.use('/tarif', TarifRoutes.routes)


app.use((req, res, next) => {
    const error = new Error("Route non définie");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

app.listen(config.port, () => console.log('Application is listening on port ' + config.port));
