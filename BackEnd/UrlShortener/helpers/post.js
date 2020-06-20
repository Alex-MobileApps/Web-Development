"use strict";

const dns = require("dns");
const urlModel = require("./models.js").urlModel;

const getHost = url => {
  const protocolRegex = /^https?:\/\/(.*)/i;
  const protocolMatch = url.match(protocolRegex);
  if (protocolMatch) {
    const hostRegex = /^([\w\-]+\.)+[\w\-]+(.*)/i;
    const hostMatch = protocolMatch[1].match(hostRegex);
    if (hostMatch) {
      const moreRegex = /^(\/[\w\-]+)*$/i;
      if (moreRegex.test(hostMatch[2]))
        return hostMatch[0].replace(/\/.*$/, "");
    }
  }
};

exports.post = (req, res) => {
  const url = req.body.url.replace(/\/*$/, "");
  const host = getHost(url);
  if (!host) return res.json({ error: "invalid URL" });
  dns.lookup(host, (err, address, family) => {
    if (err) return res.json({ error: "invalid URL" });
    urlModel.findOne({ original_url: url }, (err, data) => {
      if (err) return res.json({ error: "unknown error" });
      if (data)
        return res.json({ original_url: url, short_url: data.short_url });
      urlModel.countDocuments({}, (err, count) => {
        if (err) return res.json({ error: "unknown error" });
        const index = count ? count + 1 : 1;
        const newUrl = new urlModel({ original_url: url, short_url: index });
        newUrl.save((err, data) => {
          if (err) return res.json({ error: "unknown error" });
          return res.json({ original_url: url, short_url: index });
        });
      });
    });
  });
};
