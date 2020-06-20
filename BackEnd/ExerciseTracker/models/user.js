"use strict";

const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

// schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    maxlength: [20, "username is too long"]
  }, 
  _id: {
    type: String,
    index: true,
    default: shortid.generate
  }
});

// pre-save

UserSchema.pre("save", function(next) {
  mongoose.model("User").findOne({username: this.username}, (err1, user) => {
    if (err1) return next(err1);
    if (!user) return next();
    console.log(this);
    const err2 = new Error(`"${this.username}" already exists (userId: "${user._id}")`);
    return next(err2);
  });
});

// model

module.exports = mongoose.model("User", UserSchema);