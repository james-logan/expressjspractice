require('./lib/secrets.js');

var express = require('express');
var app = express();

var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var chickennuggets = require('./routes/chickennuggets');


//I DON'T KNOW WHAT THIS DOES
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);


//locals are like constants
app.locals.title = 'aweso.me';

app.use(bodyParser.urlencoded({extended: true}));
app.use(lessCSS('public'));

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(morgan('combined', {stream: logStream}));
app.use(morgan('dev'));




app.use(function (req, res, next) {
  var log = require('./lib/loggly.js')('incoming')
  log.log(({
    ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  }));
  next();
})

app.use(express.static('public'));

// app.use(morgan('dev'));

app.use('/', require('./routes/index'));
app.use('/pizza', pizza);
app.use('/chickennuggets', chickennuggets);


//OLD LOGGING - BEFORE MORGAN//
// app.use(function (req, res, next) {
//   // logging at the top
//   console.log('Request at' + new Date().toISOString())
//   next();
// })

app.use(function (req, res) {
  res.status(403);
  res.send('This does not exist, Silly!')
})

app.use(function (err, req, res, next) {
  var log = require('./lib/loggly.js')('error');

  log.log(({ip: req.ip,
    date: new Date(),
    url: req.url,
    status: res.statusCode,
    method: req.method
  }));

  console.log('ERRRRRRR', err.stack);
  res.status(500).send('My Bad');
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
