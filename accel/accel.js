// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/

var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['B']);

let verticalState;

// Initialize the accelerometer.
accel.on('ready', function () {
  console.log('I AM READAAAAA');

  // Stream accelerometer data
  accel.on('data', function (xyz) {
      let newVstate = true;

      if (xyz[2].toFixed(2) < 0) {
        newVstate = false;
      }

      if (newVstate !== verticalState) {
        verticalState = newVstate;
        if (verticalState) {
          console.log('I am the right way up');

        } else {
          console.log('I am upside down');
        }
      }
  });

});

accel.on('error', function(err){
  console.error('Error:', err);
});
