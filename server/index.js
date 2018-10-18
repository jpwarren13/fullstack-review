const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let app = express();
const github = require('../helpers/github').getReposByUsername;
const db = require('../database/index');



app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/repos', function (req, res) {

  console.log(req.body);

  //make an API call to github.
  github(req.body.username, (apiResponse)=>{
//console.log(apiResponse);
let repoList = apiResponse.data.sort((a, b) => {return b.watchers - a.watchers});


db.save(repoList, () => {
  res.statusCode = 201;
res.end();
});

});



  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
console.log('INSIDE SERVER GET', req.body);

db.retrieve((results) => {
  res.json(results);
  res.end();
})
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
