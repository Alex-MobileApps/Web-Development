var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  const date_string = req.params.date_string;
  let date = typeof date_string === "undefined" ? new Date() : new Date(date_string);
  if (isNaN(date.getTime())) {
    const date_number = parseInt(date_string);
    if (!isNaN(date_number)) {
      date = new Date(date_number);
    }
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});