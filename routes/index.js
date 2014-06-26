var fs = require('fs')
  , _ = require('lodash')

exports.index = function(req, res) {
  fs.readdir(__dirname+'/../../posts/improv/', function(err, improv) {
    var recentImprov = improv[improv.length-1]
    fs.readFile(__dirname+'/../../posts/improv/'+recentImprov, 'utf8', function(err, content) {
      var improvContent = marked(content)
    })
  })
  fs.readdir(__dirname+'/../../posts/posts/', function(err, posts) {
    var recentImprov = posts[posts.length-1]
    fs.readFile(__dirname+'/../../posts/posts/'+recentPosts, function(err, content) {
      var postsContent = marked(content)
    })
  })
  fs.readdir(__dirname+'/../../posts/comedy/', function(err, comedy) {
    var recentComedy = comedy[comedy.length-1]
    fs.readFile(__dirname+'/../../posts/comedy'+recentComedy, function(err, content) {
      var comedyContent = marked(content)
    })
  })
  res.render('index', {title: 'welcome to dan', improv:improvContent, posts:postsContent, comedy:comedyContent})
}