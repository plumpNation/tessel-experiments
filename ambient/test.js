let es = require('elasticsearch');
let client = new es.Client({
  host: 'http://10.13.37.134:9200',
  log: 'trace'
});

setInterval(function () {
    let log = {
        light: 1,
        sound: 1
    };

    client.create({
      index: 'tessel',
      type: 'ambient',
      body: log
    }, function (error, response) {
      if (error) return console.error(error);
      console.log(response);
    });


}, 1000);
