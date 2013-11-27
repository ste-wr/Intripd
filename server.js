/* Node.js entry */

var express 	    = require('express'),
	  http          = require('http'),
    mongoose      = require('mongoose'),
    mongodb       = require('mongodb'),
    passport      = require('passport'),
    RedisStore    = require('connect-redis')(express);
    config        = require('./config')();

var User = require('./app/models/usermodel');

var server        = express();

//connect to Mongo Database and check that we've connected OK.
mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  //database connection open
  console.log('Mongoose connection open at ' + db.host + ':' + db.port);
  console.log('Using database ' + db.name);
});

//set up passport configuration prior to initialize
require('./app/controllers/passport')(passport);

server.use(express.logger('dev'));
server.use(express.urlencoded());
server.use(express.json());
server.use(express.methodOverride());
//use cookieparser for session storage
server.use(express.cookieParser('qL17C8iQnxPuDg50mYFDk56sdR0KuUm3'));
//setup secret key for session hash and add to RedisStore for persistent session storage across server restarts
server.use(express.session({
  secret:'qL17C8iQnxPuDg50mYFDk56sdR0KuUm3',
  store: new RedisStore({
  })
}));

//initialize passport with config options defined above
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(__dirname + '/public'));

//load the routers
require('./app/router/auth.js')(server, passport);

//start the server
http.createServer(server).listen(config.port, function() {
  console.log('Intripd starting on port ' + config.port);
});