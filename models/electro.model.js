const mongoose = require("mongoose");

const ElectroSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
    name: String,
    address: String,
    meterId: Number,
    Complains: String,
    consumedEnergy: Number,
    email: String,
    phone: Number,
    rate: Number,
    type: {
      type: String,
      enum: ["INDUSTRY", "EDUCATION","HOUSEHOLD","HOSPITAL"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Electro", ElectroSchema);
