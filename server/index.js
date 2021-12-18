const express = require('express');
let app = express();
var getReposByUsername = require("../helpers/github.js");
var Repos = require("../database/index.js");

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  console.log(username)
  getReposByUsername.getReposByUsername(username, (err, response) => {
    if (err) {
      res.statusCode(500);
    } else {
      Repos.drop(username);
      var data = response.data;
      for (var i = 0; i < data.length; i++) {
        Repos.save(data[i]);
      };
      res.send("Success!");
    };
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repos.findTop((err, result) => {
    if (err) {
      res.statusCode(500);
    } else {
      res.send(result);
    };
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

