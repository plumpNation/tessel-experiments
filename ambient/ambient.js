// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['A']);

let date = new Date();

let index = 'tessel-ambient-' +
  (date.getFullYear().toString()).substr(2) + '.' +
  ("0" + (date.getMonth() + 1).toString()).substr(-2) + '.' +
  ("0" + date.getDate().toString()).substr(-2);

let es = require('elasticsearch');
let client = new es.Client({
  host: 'http://10.13.37.134:9200',
  log: 'trace'
});

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;

        let log = {
          'light': lightdata.toFixed(8),
          'sound': sounddata.toFixed(8),
          'timestamp': new Date().toISOString()
        };

        client.create({
          index: index,
          type: 'ambient',
          body: log
        }, function (error, response) {
          if (error) return console.error(error);
          console.log(response);
        });

      });
    });
  }, 1000); // The readings will happen every 1 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
