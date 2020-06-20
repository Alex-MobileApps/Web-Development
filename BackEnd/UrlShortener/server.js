'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const post = require('./helpers/post.js').post;
const get = require('./helpers/get.js').get;


const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => res.sendFile(process.cwd() + '/views/index.html'));

app.get("/api/shorturl/:index", get);

app.post("/api/shorturl/new", post);

app.listen(port, () => console.log('Node.js listening ...'));