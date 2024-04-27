const mongoose = require("mongoose");

const defultaddress = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    mobile_number: {
      type: Number,
    },
    email: {
      type: String,
    },
    address_line_1: {
      type: String,
    },
    address_line_2: {
      type: String,
    },
    landmark: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    default: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("defultaddress", defultaddress);
