var request = require("request");

let url = 'http://localhost:8000/api/'

let apiRequest = (method, slug, body) => {
  var options = {
    method: method,
    url: url + slug,
    headers:
      { 'Content-Type': 'application/json' },
    body: body,
    json: true
  };

  request(options, function (error, response, body) {
    if (error) { throw new Error(error) }

    console.log(body);
  });
}

// Update specific user
apiRequest('PUT', 'user/update/11', { xp: 10, currency: 10 })

// Get specific user
apiRequest('GET', 'user/5')

// Get all users
// apiRequest('GET', 'users')