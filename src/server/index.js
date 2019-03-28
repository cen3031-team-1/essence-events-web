const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
const config = require('./config');

const app = express();

const userRouter = require('./api/user');

mongoose.connect(config.URI, { useNewUrlParser: true, useCreateIndex: true });

app.use(express.static('dist'));

app.use('/api/user', userRouter);

app.use('/*', (req, res) => {res.send('test')});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
