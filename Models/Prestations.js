const mongoose = require("mongoose");
const PrestationType = require("./PrestationType");

const PrestationSchama = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  typePrestation: [
    {
      nom: String,
      photoURL: String
    }
  ]
}, { timestamps: true });



var Prestation = mongoose.model("prestations", PrestationSchama);

module.exports = Prestation;