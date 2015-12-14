var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')
  , postInfos
  , postBucket

exports.index = function(req, res) {
  getLatestPost(function(latestPost) {
    res.render('index', {title: 'welcome to dan', post:latestPost})
  })
}

exports.latestPost = function(req, res) {
  getLatestPost(function(content) {
    res.render('latestPost', {title: "what's new", post:content})
  })
}

exports.about = function(req, res) {
  res.render('about', {title: 'the 26th chamber'})
}

exports.projects = function(req, res) {
  res.render('projects', {title: 'things i have done'})
}

exports.list = function(req, res) {
  postInfos = []
  var i = 1
  fs.readdir(__dirname+'/../posts', function(err, files) {
    files = files.filter(getMD)
    _.each(files, function(file) {
      fs.readFile(__dirname+'/../posts/'+file, 'utf8', function(err, content) {
        var title = content.split('===')[0].replace(/(\r\n|\n|\r)/gm, "")
        var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
        postInfos.push({id:file, title:title, url:encodeURIComponent(url)})
        if(i === files.length) {
          postInfos = _.sortBy(postInfos, 'id')
          postBucket = postInfos.reverse()
          res.render('oldPosts', {title:'a history lesson in your hands', posts:postInfos})
        }
        i++
      })
    })
  })
}

exports.getPost = function(req, res) {
  if(postBucket) {
    var post = _.find(postBucket, {url:encodeURIComponent(req.params.postName)})
    fs.readFile(__dirname+'/../posts/'+post.id, 'utf8', function(err, content) {
      res.render('postView', {title:post.title,content:marked(content)})
    })
  }
  fs.readdir(__dirname+'/../posts', function(err, files) {
    files = files.filter(getMD)
    _.each(files, function(file) {
      fs.readFile(__dirname+'/../posts/'+file, 'utf8', function(err, content) {
        var title = content.split('===')[0].replace(/(\r\n|\n|\r)/gm, "")
        var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
        if(url === req.params.postName) {
          res.render('postView', {title:title, content:marked(content)})
        }
      })
    })
  })
}

// get an array of folder contents, return only .md files //
function getMD(posts) {
  return path.extname(posts)==='.md'
}

// get latest post //
function getLatestPost(cb) {
  fs.readdir(__dirname+'/../posts', function(err, posts) {
    posts = posts.filter(getMD)
    fs.readFile(__dirname+'/../posts/'+posts[posts.length-1], 'utf8', function(err, content) {
      cb(marked(content))
    })
  })
}