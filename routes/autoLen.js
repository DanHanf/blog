var nodemailer = require('nodemailer')
  , encryptor = require('file-encryptor')
  , fs = require('fs')
  , envConfig = require('../envConfig.json')
  , validator = require('validator')


var key = envConfig.ENCRYPTOR_KEY

exports.get = function(req, res) {
  res.render('dailyLen', {title:'Give Us This Day Our Daily Len'})
}

exports.signUp = function(req, res) {
  var email = req.body.emailAddress
  if(validator.isEmail(email) === true) {
    encryptor.decryptFile('./secrets/emails.dat', './secrets/emailList.csv', key, function(err) {
      fs.readFile('./secrets/emailList.csv', 'utf8', function(err, data) {
        var emails = data.split(',')
        if(emails.indexOf(email)>= 0) {
          res.send('You already signed up, you weirdo.')
        }
        else {
          fs.appendFile('./secrets/emailList.csv', ','+email, function(err) {
            if(err) console.log(err)
            fs.unlink('./secrets/emails.dat', function() {
              encryptor.encryptFile('./secrets/emailList.csv', './secrets/emails.dat', key, function() {
                fs.unlink('./secrets/emailList.csv')
                res.send('Look forward to Your Daily Len!')
              })
            })
          })
        }
      })
    })
  }
  else {
    res.send('You gotta enter a valid email address.')
  }
}



