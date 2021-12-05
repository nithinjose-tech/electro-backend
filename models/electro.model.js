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
    ComplainsandServices: [
      
      {
        type: {
          type: String,
          enum: ["COMPLAINT", "SERVICES"],
        },
        details: {
          type: String,
        },
      },
    ],
    consumedEnergy: Number,
    email: String,
    phone: Number,
    rate: Number,
    type: {
      type: String,
      enum: ["INDUSTRY", "EDUCATION", "HOUSEHOLD", "HOSPITAL"],
    },
    systemType:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Electro", ElectroSchema);
