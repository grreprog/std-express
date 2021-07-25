
'use stricts';

const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const routes = require('./route/route_main.js');

const port = 3000;

function server() {
  global.app = express();
  global.app.redisClient = redis.createClient();

  app.use(session({
    secret : 'namannothingcat',
    store : new redisStore({
      client : global.app.redisClient,
      host : 'localhost',
      port : '6379',
      ttl : 255
    }),
    saveUninitialized : false,    
    resave : false,
  }));

  const middlewareStack = [];

  function testA(req, res, next) {
    console.log('testA');
    next();
  }

  function testB(req, res, next) {
    console.log('testB');
    next();
  }

  function testC(req, res, next) {
    console.log('testC');
    res.send(200);
  }

  let arrFunc = [testA, testB, testC];
  app.get('/test', arrFunc);
  //global.app['get']('/test', arrFunc);

  app.use('/', routes);
  
  app.listen(port, () => {
    console.log(`listening ... port(${port})`);
  })
}

server();