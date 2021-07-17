
'use stricts';

const express = require('express');
const router = express.Router();

//global.app.http[reqMethod.toLowerCase()](currRoute, middlewareStack, handlerChain);

router.use( (req, res, next) => {
  // time log
  let today = new Date();
  if (req.query) {
    console.log(`${today.toLocaleString()} | req:${req.path} | query:${req.query}`);
  }
  else {
    console.log(`${today.toLocaleString()} | req:${req.path}`);
  }
  

  // session check
  if (!req.session) {
    return next(new Error('!req.session'));
  }

  next();
}); 

router.get('/', (req, res) => {
  res.send('What do you want?!?');
});

router.get('/session-test', (req, res) => {
  res.send('not yet session id');
});

router.get('/redis-store-count', (req, res) => {
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

router.get('/set-extradata', (req, res) => {
  req.session.extradata = {
    a : 10,
    b : 15, 
    c : 'extradata 다'
  };

  res.send(200);
})

router.get('/show-session', (req, res) => {
  console.log(req.session.extradata);

  res.send(200);
})

router.get('/session-destroy', (req, res) => {
  req.session.destroy();
  res.send('session destroyed!');
})

module.exports = router;