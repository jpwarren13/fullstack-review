const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to mongoose DB')


})

let repoSchema = mongoose.Schema({
  username: String,
  url: String,
  dbName: String,
  rank: String,
  
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repoList) => {
  // console.log(repoList[0].url);
  // console.log(repoList[0].name);
  // console.log(repoList[0].owner.login);
  // console.log(repoList[0].watchers);
let reps = [];
for (let i = 0; i < repoList.length; i++){
  let insertion = new Repo({
    username: repoList[i].owner.login,
    url: repoList[i].svn_url,
    dbName: repoList[i].name,
    rank: repoList[i].watchers,
  })
reps.push(insertion);
console.log(reps);
}
Repo.insertMany(reps, (err) => {
  console.error(err);
})
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}
let retrieve = (callback) => {
  Repo.find().sort({'rank': -1}).limit(25).exec((err, docs) => {
if (err){
  console.error(err);
} else {
  console.log('INSIDE RETRIEVE!', docs);
  callback(docs);
}

  })

}

module.exports.save = save;
module.exports.retrieve = retrieve;