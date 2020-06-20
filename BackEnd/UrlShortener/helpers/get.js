"use strict";

const urlModel = require("./models.js").urlModel;

exports.get = (req, res) => {
  const index = parseInt(req.params.index);
  if (!index) return res.json({ error: "invalid URL" });
  urlModel.findOne({ short_url: index }, (err, data) => {
    if (err || !data) return res.json({ error: "unknown error" });
    return res.redirect(data.original_url);
  });
};
