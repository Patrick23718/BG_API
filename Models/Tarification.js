const mongoose = require("mongoose");

const TarifSchama = mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
  prix: {
    type: Number,
    required: true,
  },
  prestation: {
    type: mongoose.Types.ObjectId,
    ref: "prestations",
    required: true,
  },
  typePrestation: {
    type: mongoose.Types.ObjectId,
    ref: "prestations.typePrestation",
    required: true,
  }
}, { timestamps: true });



var Tarif = mongoose.model("tarifications", TarifSchama);

module.exports = Tarif;