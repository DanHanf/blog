var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')

exports.index = function(req, res) {
  getImprovContent(function(err, improv) {
    getPostContent(function(err, post) {
      getTechContent(function(err, tech) {
        res.render('index', {title: 'welcome to dan', improv:improv, post:post, tech:tech})
      })
    })
  })
}

function getImprovContent(cb) {
  fs.readdir(__dirname+'/../posts/improv', function(err, improv) {
    var recentImprov = improv[improv.length-1]
    fs.readFile(__dirname+'/../posts/improv/'+recentImprov, 'utf8', function(err, content) {
      var improvContent = marked(content)
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

function getTechContent(cb) {
  fs.readdir(__dirname+'/../posts/tech/', function(err, tech) {
    var recentTech = tech[tech.length-1]
    fs.readFile(__dirname+'/../posts/tech/'+recentTech, 'utf8', function(err, content) {
      var techContent = marked(content)
      cb(err, techContent)
    })
  })
}  

exports.list = function(cb) {
  getImprovContent(function(err,improv) {
    getPostContent(function(err,post) {
      getTechContent(function(err,tech) {
        getList(improv, 'improv', function(improvPosts) {
          getList(post, 'post', function(postPosts) {
            getList(tech, 'tech', function(techPosts) {
              res.render('oldPosts', {improvPosts:improvPosts, postPosts:postPosts, techPosts:techPosts})
            })
          })
        })
      })
    })
  })
}

function getList(files, cat, cb) {
  var postInfos = []
  var i = 1
  _.each(files, function(file) {
    console.log(files)
    fs.readFile(__dirname + '/../'+cat+'/'+file, 'utf8', function(err, content) {
      console.log(__dirname + '/../'+cat+'/'+file)
      var title = content.split('===')[0].replace(/(\r\n|\n|\r)/gm, "")
      var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
      postInfos.push({id:file, title:title, url:url})
      if(i >= files.length) {
        postInfos = _.sortBy(postInfos, 'id')
        cb(postInfos)
      }
      i++
    })
  })
}
