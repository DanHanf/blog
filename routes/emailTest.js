var fs = require('fs')
  , encryptor = require('file-encryptor')
  , envConfig = require('../envConfig.json')

var key = envConfig.ENCRYPTOR_KEY

encryptor.encryptFile('./secrets/emailList.csv', './secrets/emails.dat', key, function(err) {
  if(err) {
    console.log(err)
  }
  else {
    console.log('success')
  }
})