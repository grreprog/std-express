
'use stricts';

const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const port = 3000;

function server() {
  global.app = express();
  global.app.redisClient = redis.createClient();

  app.use(session({
    store : new redisStore({client : global.app.redisClient}),
    saveUninitialized : false,
    secret : 'namannothingcat',
    resave : false,
  }));

  app.use((req, res, next) => {
    if (!req.session) {
      return next(new Error('oh no'));
    }

    next();
  })

  app.get('/', (req, res) => {
    res.send('What do you want?!?');
  });

  app.get('/session-test', (req, res) => {
    res.send('not yet session id');
  });

  app.get('/redis-store-count', (req, res) => {
    console.log(`req.session.count = ${req.session.count}`);
    let session = req.session;
    if (session && session.count) {
      session.count++;
    }
    else {
      session.count = 1;
    }
    res.send('count is ' + session.count + ' ' + session.id);
  })

  app.get('/set-extradata', (req, res) => {
    req.session.extradata = {
      a : 10,
      b : 15, 
      c : 'extradata 다'
    };

    res.send(200);
  })

  app.get('/show-session', (req, res) => {
    console.log(req.session.extradata);

    res.send(200);
  })

  app.get('/session-destroy', (req, res) => {
    req.session.destroy();
    res.send('session destroyed!');
  })
  
  app.listen(port, () => {
    console.log(`listening ... port(${port})`);
  })
}

server();