
'use stricts';

function test1(req, res, next) {
  console.log(test);
  next();
};

function test2(req, res, next) {

}

module.exports.routes = {
  '/test1' : test1,
  '/test2' : test2,
};