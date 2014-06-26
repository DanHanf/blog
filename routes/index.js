var fs = require('fs')
  , _ = require('lodash')

exports.index = function(req, res) {
  fs.readdir(__dirname+'/../../posts/improv/', function(err, improv) {
    var recentImprov = improv[improv.length-1]
    fs.readFile(__dirname+'/../../posts/improv/'+recentImprov, 'utf8', function (err, content) {
      var htmlContent = marked(content)
    })
  })
  res.render('index', title: 'welcome to dan')
}