// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var request = require('request');
var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;

        let log = {
          'light': lightdata.toFixed(8),
          'sound': sounddata.toFixed(8)
        };

        request.post('http://10.13.37.134:9200/ambient', log, function (err, response, body) {
          if (err) console.error(err); return;
          console.log(response);
        });

      });
    });
  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});
