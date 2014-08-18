var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')

exports.index = function(req, res) {
  getImprovContent(function(err, improv) {
    getPostContent(function(err, post) {
      getComedyContent(function(err, comedy) {
        res.render('index', {title: 'welcome to dan', improv:improv, post:post, comedy:comedy})
      })
    })
  })
}

function getImprovContent(cb) {
  fs.readdir(__dirname+'/../posts/improv', function(err, improv) {
    var recentImprov = improv[improv.length-1]
    fs.readFile(__dirname+'/../posts/improv/'+recentImprov, 'utf8', function(err, content) {
      var improvContent = marked(content)
      console.log(improvContent)
      cb(err, improvContent)
    })
  })
}

function getPostContent(cb) {
  fs.readdir(__dirname+'/../posts/posts', function(err, post) {
    var recentPost = post[post.length-1]
    fs.readFile(__dirname+'/../posts/posts/'+recentPost, 'utf8', function(err, content) {
      var postContent = marked(content)
      cb(err, postContent)
    })
  })
}

function getComedyContent(cb) {
  fs.readdir(__dirname+'/../posts/comedy/', function(err, comedy) {
    var recentComedy = comedy[comedy.length-1]
    fs.readFile(__dirname+'/../posts/comedy/'+recentComedy, 'utf8', function(err, content) {
      var comedyContent = marked(content)
      cb(err, comedyContent)
    })
  })
}  
