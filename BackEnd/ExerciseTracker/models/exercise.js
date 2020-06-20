"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.js");

// schema

const ExerciseSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId is required"]
  }, 
  description: {
    type: String,
    required: [true, "description is required"],
    maxlength: [20, "description is too long"]
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
    min: [1, "duration is too short"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// pre-save

ExerciseSchema.pre("save", function(next) {
  User.findById(this.userId, (err1, user) => {
    if (err1) return next(err1);
    if (user) {
      if (!this.date) this.date = Date.now();
      return next()
    };
    const err2 = new Error(`userId "${this.userId}" does not exist`);
    return next(err2);
  });
});

// model

module.exports = mongoose.model("Exercise", ExerciseSchema);