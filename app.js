var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , routes = require('./routes')
  , _ = require('lodash')
  , index = require('./routes/index')
  , autoLen = require('./routes/autoLen.js')


var app = express();

// config app
app.set('port', process.env.PORT || config.port);
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.favicon('favicon.ico'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.index);
app.get('/oldPosts', index.list);
app.get('/posts/:postName', index.getPost);
app.get('/latestPost', index.latestPost);
app.get('/about', index.about);
app.get('/projects', index.projects);
app.get('/dailyLen', autoLen.get);
app.post('/dailyLen/signUp', autoLen.signUp);


http.createServer(app).listen(app.get('port'), function() {
  console.log("express server listening on port "+app.get('port'))
});