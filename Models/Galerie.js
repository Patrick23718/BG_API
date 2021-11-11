const mongoose = require("mongoose");

const GalerieSchama = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });



var Galerie = mongoose.model("galerie", GalerieSchama);

module.exports = Galerie;