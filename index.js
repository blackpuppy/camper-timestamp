var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('Refer to <a href="https://timestamp-ms.herokuapp.com/" target="_blank">FreeCodeCamp Timestamp Microservice!</a>');
  res.end();
});

app.get('/:str', function(req, res) {
  var input = decodeURI(req.params.str);

  // console.log(input);

  var naturalFormat = function (date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  };

  var date = null;

  try {
    if (/^\d+$/.test(input)) {
      input = input * 1000;
    }
    date = new Date(input);
  } catch (e) {
    console.log(err);

    date = null;
  }

  var doc = {};
  if (Object.prototype.toString.call(date) === "[object Date]"
    && !isNaN(date.getTime())
  ) {
    doc = {
      unix: date.getTime() / 1000,
      natural: naturalFormat(date)
    };
  } else {
    doc = {
      unix: null,
      natural: null
    };
  }

  console.log(input, ' -> ', date, doc);

  res.send(JSON.stringify(doc));
  res.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
