const mongoose = require("mongoose");

const PlanningSchama = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  plage: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });



var Planning = mongoose.model("planning", PlanningSchama);

module.exports = Planning;