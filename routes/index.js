var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')
  , postInfos
  , postBucket

exports.index = function(req, res) {
  res.render('index', {title: 'welcome to dan'})
}

exports.latestPost = function(req, res) {
  fs.readdir(__dirname+'/../posts', function(err, posts) {
    posts = posts.filter(getMD)
    fs.readFile(__dirname+'/../posts/'+posts[posts.length-1], 'utf8', function(err, content) {
      res.render('latestPost', {title: "what's new", post:marked(content)})
    })
  })
}

exports.about = function(req, res) {
  res.render('about', {title: 'the 26th chamber'})
}

exports.list = function(req, res) {
  postInfos = []
  var i = 1
  fs.readdir(__dirname+'/../posts', function(err, files) {
    files = files.filter(getMD)
    postBucket = files
    _.each(files, function(file) {
      fs.readFile(__dirname+'/../posts/'+file, 'utf8', function(err, content) {
        var title = content.split('===')[0].replace(/(\r\n|\n|\r)/gm, "")
        var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
        postInfos.push({id:file, title:title, url:url})
        if(i = files.length) {
          postInfos = _.sortBy(postInfos, 'id')
          console.log(postInfos)
          res.render('oldPosts', {title:'a history lesson in your hands', posts:postInfos})
        }
        else i++
      })
      i++
    })
  })
}

exports.getPost = function(req, res) {

}

// get an array of folder contents, return only .md files
function getMD(posts) {
  return path.extname(posts)==='.md'
}