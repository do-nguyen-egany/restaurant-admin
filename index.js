// Example express application adding the parse-server module to expose Parse
// compatible API routes.
var fs = require('fs');
const hostIP = 'localhost';
const appKEY = 'myAppId';

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/restaurant',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || appKEY,
  masterKey: process.env.MASTER_KEY || 'yourMasterKey', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://'+hostIP+':1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    //classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
// app.get('/', function(req, res) {
//   res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
// });

app.get('/',function (req,res) {
    //res.sendFile(path.join(__dirname, '/public/admin.html'));
    var html = fs.readFileSync(path.join(__dirname, '/public/admin.html'), 'utf8');
    html = html.replace('@@HOST@@',hostIP);
    html = html.replace('@@APP_ID@@',appKEY);
    res.send(html);
});
//404
app.get('*', function(req, res){
    var html = fs.readFileSync(path.join(__dirname, '/public/admin.html'), 'utf8');
    html = html.replace('@@HOST@@',hostIP);
    html = html.replace('@@APP_ID@@',appKEY);
    res.send(html);
    //res.sendFile(path.join(__dirname, '/public/admin.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/test', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
