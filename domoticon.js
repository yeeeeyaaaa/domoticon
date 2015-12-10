var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cons = require('consolidate');
var swig = require('swig');
var path = require('path');
//var Conf = require('./config/development.json');


// Load configuration
/*var node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
console.log('node env ' + node_env);
var config = Conf.load(node_env);*/
/*var config = Conf;

if (!config.host || !config.port || !config.secret || !config.mongo || !config.mongo.name || !config.mongo.host || !config.mongo.port || !config.mongo.user) {
    return console.log('\u001b[31mMissing configuration file \u001b[33mconfig/' + node_env + ' recupera algo ' + config.host + '.json\u001b[31m. Create configuration file or start with `NODE_ENV=development node domoticon.js` to use another configuration file.\033[0m');
}*/
var config;
var options = {
    debug: config && config.debug || false,
    host: config && config.host || 'http://192.168.1.51',
    port: config && config.port || '8080',
    pin: config && config.pin || '1',
    call: config && config.call || 'analog'
}

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());

app.engine('server.view.html', cons['swig']);
app.set('view engine', 'server.view.html');
app.set('views', './views');
app.use(express.static(path.resolve('./public')));

app.route('/domoticon')
    .get(function(req, res, next) {
        res.render('index');
    });

//require('./controllers/leds')(app);

//require('./controllers/arduinoYun')(app);

app.listen(8000, function() {
    console.log('Raspi Express server listening...');
});
