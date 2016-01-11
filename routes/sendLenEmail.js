var nodemailer = require('nodemailer')
  , encryptor = require('file-encryptor')
  , fs = require('fs')
  , envConfig = require('../envConfig.json')


var key = envConfig.ENCRYPTOR_KEY

var generator = require('xoauth2').createXOAuth2Generator({
  user: envConfig.MY_EMAIL,
  clientId: envConfig.MY_CLIENT,
  clientSecret: envConfig.MY_CLIENT_SECRET,
  refreshToken: envConfig.MY_REFRESH_TOKEN,
})

generator.on('token', function(token) {

})

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    xoauth2: generator
  },
})

encryptor.decryptFile(__dirname+'/../secrets/emails.dat', __dirname+'/../secrets/emailList.csv', key, function(err) {
  if(err){console.log(err)}
  fs.readFile(__dirname+'/../secrets/emailList.csv', 'utf8', function(err, data) {
    if(err) {console.log(err)}
    var emails = data.split(',')
    require('uniq')(emails)
    transporter.sendMail({
      from: envConfig.MY_EMAIL,
      to: emails,
      subject: "Your Daily Len!",
      html: "<b>Here's your daily dose of Steal My Sunshine by Len!</b> <br /><br /> <a href='https://youtu.be/E1fzJ_AYajA'>Have a conqueror's day</a>,<br /><br />Your Daily Len"
    }, function(err, response) {
      if(err) {
        console.log(err)
      }
      else {
        fs.unlink(__dirname+'/../secrets/emailList.csv', function() {
        })
      }
    }
    )
  })
})
