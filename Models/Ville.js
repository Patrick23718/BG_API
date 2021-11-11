const mongoose = require("mongoose");

const VilleSchama = mongoose.Schema({
  ville: {
    type: String,
    required: true,
  },
  subVille: [String]
}, { timestamps: true });



var Ville = mongoose.model("ville", VilleSchama);

module.exports = Ville;