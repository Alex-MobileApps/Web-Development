"use strict";

const User = require("../models/user.js");

exports.create = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return next(err);
    res.json({
      _id: user._id,
      username: user.username
    });
  });
};

exports.log = (req, res, next) => {
  User.find()
    .select("_id username")
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    });
};
