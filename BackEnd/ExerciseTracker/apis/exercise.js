"use strict";

const Exercise = require("../models/exercise.js");
const User = require("../models/user.js");

exports.create = (req, res, next) => {
  const newExercise = new Exercise(req.body);
  newExercise.save((err, exercise) => {
    if (err) return next(err);
    res.json({
      userId: exercise.userId,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  });
};

exports.log = (req, res, next) => {
  const query = req.query;
  const from = new Date(query.from);
  const fromValid = !isNaN(from.getTime());
  const to = new Date(query.to);
  const toValid = !isNaN(to.getTime());
  User.findById(query.userId, (err1, user) => {
    if (err1) return next(err1);
    if (!user) {
      const errMessage = query.userId ? 'no user exists for this userId' : 'userId not set\nplease use the format "/api/exercise/log?userId=<userId>"';
      const err2 = new Error(errMessage);
      return next(err2);
    }
    Exercise.find({
      userId: query.userId,
      date: {
        $gte: fromValid ? from.getTime() : -8640000000000000,
        $lte: toValid ? to.getTime() : 8640000000000000
      }
    })
      .sort("-date")
      .limit(query.limit)
      .exec((err, exercises) => {
        if (err) return next(err);
        res.json({
          _id: query.userId,
          username: user.username,
          from: fromValid ? from.toDateString() : undefined,
          to: toValid ? to.toDateString() : undefined,
          count: exercises.length,
          log: exercises.map(exercise => {
            return {
              description: exercise.description,
              duration: exercise.duration,
              date: exercise.date.toDateString()
            }
          })
        });
      });
  });
};