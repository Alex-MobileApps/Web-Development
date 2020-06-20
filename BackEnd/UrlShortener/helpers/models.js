"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number }
});

exports.urlModel = mongoose.model("Url", urlSchema);
