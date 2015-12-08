var http = require('http');

var Url = function(options) {
    console.log('info', 'initializing');
    this.debug = options && options.debug || false;
    this.host = options || 'http://192.168.1.51';
    this.port = options || '8080'
    this.pin = options || '1';
    this.call = options || 'analog';
}

module.exports = function(app, options) {
    console.log('info', 'attempting to find Arduino Wifi board');
    var url = new Url(options);

    var options = {
        host: url.host,
        path: '/' + url.call + '/' + url.pin,
        //since we are listening on a custom port, we need to specify it by hand
        port: url.port,
        //This is what changes the request to a POST request
        method: 'GET'
    };

    http.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            //self.emit('connected');
            console.log('connection established');
            body += chunk;
        });
        res.on('end', function() {
            console.log(body);
            /*self.emit('data', body);
            var err = null;
            self.emit('read', err, body);
            self.emit('ready');*/
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        var msg = "Could not establish HTTP connection to Arduino.";
        /*if (self.listeners('error').length > 0) {
          self.emit('error', msg);
        } else {*/
        console.error(msg);
        //}
    });
};
