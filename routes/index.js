var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')

exports.index = function(req, res) {
  getImprovContent(function(err, improv) {
    getPostContent(function(err, post) {
      getTechContent(function(err, tech) {
        console.log(res)
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

function getFileList(dir, cb) {
  fs.readdir(__dirname+'/../posts/'+dir+'/', function(err, files) {
    getList(files, dir, function(err,posts) {
      cb(null, posts)
    })
  })
}

exports.list = function(req, res) {
  getFileList('improv', function(err, improvPosts) {
    console.log(err)
    getFileList('posts', function(err,postPosts) {
      console.log(err)
      getFileList('tech', function(err,techPosts) {
        res.render('oldPosts', {improvPosts:improvPosts, postPosts:postPosts, techPosts:techPosts, title:'ye ole postses'})
      })
    })
  })
}

function getList(files, cat, cb) {
  var postInfos = []
  var i = 1
  console.log(files)
  _.each(files, function(file) {
    fs.readFile(__dirname + '/../posts/'+cat+'/'+file, 'utf8', function(err, content) {
      var title = content.split('===')[1].replace(/(\r\n|\n|\r)/gm, "")
      var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
      postInfos.push({id:file, title:title, url:url})
      console.log(postInfos)
      if(i >= files.length) {
        postInfos = _.sortBy(postInfos, 'id')
        cb(null, postInfos)
      }
      i++
    })
  })
}

exports.post = function post(req, res) {
  var post = _.find(postInfos, {url:req.params.name})
  fs.readFile(__dirname+'/posts/')
}