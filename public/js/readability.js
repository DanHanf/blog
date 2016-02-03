// F-K formula is from https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests

var app = angular.module('readabilityApp', [])

app.controller('readabilityAppController', function() {
  var readApp = this
  var readabilityAppScore = 0

  readApp.getScore = function() {
    console.log("let's go")
    var text = readApp.textDocument
    var syllables = getSyllables(text, function(syllables) {
      readApp.readabilityAppScore = getScore(text, syllables)
    })
  }
})

function getSyllables(text, done) {
  console.log("get syllables")
  var sCount = 0
  text = text.split(' ')
  text.forEach(function(word) {
    sCount = sCount + new_count(word)
  })
  done(sCount)
}

// this is from http://stackoverflow.com/questions/5686483/how-to-compute-number-of-syllables-in-a-word-in-javascript !
function new_count(word) { 
  console.log("get word ", word)
  word = word.toLowerCase();
  if(word.length <= 3) { return 1; }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  return word.match(/[aeiouy]{1,2}/g).length;
}

function getScore(text, syllables) {
  console.log("get score")
  console.log(syllables)
  var words = text.split(' ')
  var sentences = text.split('.')
  var score = (206.835 - (1.015*(words.length/sentences.length))) - (84.6*(syllables/words.length))
  return score.toFixed(3)
}