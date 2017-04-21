var request = require('request')
  , point = require('turf-point')
  , fc = require('turf-featurecollection');

exports.get = function(req, res) {
  var stationsFeedURL = 'https://www.citibikenyc.com/stations/json'
  request(stationsFeedURL, function(err, response, body) {
    eachStation(JSON.parse(body), function(stationsArr) {
      res.render('citibikeStationTracker', {title: "CitiBike NYC Station Tracker", stations: stationsArr})
    })
  })
}

eachStation = function(stationJSON, done) {
  var stations = []
  stationJSON.stationBeanList.forEach(function(beacon) {
    var station = point([beacon.longitude, beacon.latitude], {"id":beacon.id, "availableBikes":beacon.availableBikes})
    stations.push(station)
  })
  var featureColection = fc(stations)
  done(featureColection)
}