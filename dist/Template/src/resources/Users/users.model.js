const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      dropDups: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      dropDups: true,
    },
    location: {
      country: { type: String, default: "Tanzania" },
      region: String,
      district: String,
      ward: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "role",
    // },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.virtual("fullName").get(function () {
//   return this.firstName + " " + this.lastName;
// });

module.exports = mongoose.model("users", userSchema);
