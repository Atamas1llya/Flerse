import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import bodyParser from 'body-parser';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import morgan from 'morgan';
import path from 'path';

import fs from 'fs';
import https from 'https';
import http from 'http';


import config from './config';

const { port, database, secret } = config;

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: '30mb'
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret,
  store: new MongoStore({
    url: database.name
  })
}));

mongoose.Promise = bluebird;
mongoose.connect(database.name, (err) => {
  if (err) {
    console.log(`\n Error: ${err.message} \n`);
    throw new Error();
  }
  const DBName = database.name.split('/')[3];
  console.log(`Connected to MongoDB: ${DBName}`);
});

// Middlewares
import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';
import checkAdmin from './middlewares/checkAdmin';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import freeRoutes from './routes/free';

app.use('/api', authRoutes);
app.use('/api', freeRoutes);
app.use('/api', checkToken, getUser, userRoutes);

app.use(express.static(__dirname));
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  // REDIRECT HTTP to HTTPS
  const httpServer = express();
  httpServer.get('*', (req,res) => {
    res.redirect('https://flerse.com' + req.url)
  });
  httpServer.listen(80);

  // start listening...
  const httpsServer = https.createServer({
    key: fs.readFileSync('./privkey.pem', 'utf8'),
    cert: fs.readFileSync('./fullchain.pem', 'utf8')
  }, app).listen(port);
  console.log(`Listening at ${port}...`);
} else {
  app.listen(port, () => {
    console.log(`Listening at ${port}...`);
  })
}

// for ReactJS
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})
