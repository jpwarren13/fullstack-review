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
  url:  String,
  dbName: String,
  rank: String,
  id: {type: Number, unique: true}
  
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repoList, callback) => {
let reps = [];

for (let i = 0; i < repoList.length; i++){
  let insertion = new Repo({
    username: repoList[i].owner.login,
    url: repoList[i].svn_url,
    dbName: repoList[i].name,
    rank: repoList[i].watchers,
    id: repoList[i].id
  })

reps.push(insertion);
//console.log(reps);
}
Repo.insertMany(reps, (err) => {
  console.error(err);
}).then(() => callback())
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}
let retrieve = (callback) => {
  Repo.find().limit(25).sort({'rank': -1}).exec((err, docs) => {
if (err){
  console.error(err);
} else {
  console.log('INSIDE RETRIEVE!', docs);
  docs.sort((a,b)=> b.rank - a.rank);
  callback(docs);
}

  })

}

module.exports.save = save;
module.exports.retrieve = retrieve;