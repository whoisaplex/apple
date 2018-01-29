var request = require("request");

var options = {
  method: 'PUT',
  url: 'http://localhost:8000/api/user/update/11',
  headers:
    { 'Content-Type': 'application/json' },
  body: { xp: 1, currency: 1 },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
