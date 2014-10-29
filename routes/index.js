var fs = require('fs')
  , _ = require('lodash')
  , path = require('path')
  , marked = require('marked')
  , postInfos
  , improvBucket = []
  , postsBucket = []
  , techBucket = []

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

function getFileList(dir, cb) {
  fs.readdir(__dirname+'/../posts/'+dir+'/', function(err, files) {
    getList(files, dir, function(err,posts) {
      cb(null, posts)
    })
  })
}

exports.list = function(req, res) {
  getFileList('improv', function(err, improvPosts) {
    if(err) throw err
    improvBucket = improvPosts
    getFileList('posts', function(err,postPosts) {
      if(err) throw err
      postsBucket = postPosts
      getFileList('tech', function(err,techPosts) {
        if(err) throw err
        techBucket = techPosts
        res.render('oldPosts', {improvPosts:improvPosts, postPosts:postPosts, techPosts:techPosts, title:'ye ole postses'})
      })
    })
  })
}

function getList(files, cat, cb) {
  postInfos = []
  var i = 1
  _.each(files, function(file) {
    fs.readFile(__dirname + '/../posts/'+cat+'/'+file, 'utf8', function(err, content) {
      var title = content.split('---')[0].split('===')[1].replace(/(\r\n|\n|\r)/gm, "")
      var url = title.split(' ').join('-').replace(/(\r\n|\n|\r)/gm, "")
      postInfos.push({id:file, title:title, url:url})
      if(i >= files.length) {
        postInfos = _.sortBy(postInfos, 'id')
        cb(null, postInfos)
      }
      i++
    })
  })
}

exports.post = function(req, res) {
  var category = req.params.category
  var postName = req.params.postName
  loadPost(category, postName, function(err, postTitle, post) {
    if(err) throw err
    res.render('postView', {title: postTitle, content:post})
  })
}

function loadPost(cat, name, cb) {
  if(cat === 'improv') {
    var post = _.find(improvBucket, {url:name})
    fs.readFile(__dirname+'/../posts/'+cat+'/'+post.id, 'utf8', function(err, content) {
      var htmlContent = marked(content)
      cb(null, name, htmlContent)
    })
  }
  else if(cat === 'posts') {
    var post = _.find(postsBucket, {url:name})
    fs.readFile(__dirname+'/../posts/'+cat+'/'+post.id, 'utf8', function(err, content) {
      var htmlContent = marked(content)
      cb(null, name, htmlContent)
    })
  }
  else {
    var post = _.find(techBucket, {url:name})
    fs.readFile(__dirname+'/../posts/'+cat+'/'+post.id, 'utf8', function(err, content) {
      var htmlContent = marked(content)
      cb(null, name, htmlContent)
    })
  }

}