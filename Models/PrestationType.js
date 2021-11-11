const mongoose = require("mongoose");

const PrestationTypeSchama = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  // prestation: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "prestations",
  //   required: true,
  // },
  photoURL: {
    type: String,
    required: true,
  },
});

var PrestationType = mongoose.model("type_prestations", PrestationTypeSchama);

module.exports = PrestationType;