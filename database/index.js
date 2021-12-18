const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id:Number,
  name: String,
  owner: String,
  url: String,
  size: Number,
  forks: Number,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let drop = (username) => {
  Repo.remove({owner: username}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database dropped!")
    }
  });
};

let save = (res) => {
  var repos = new Repo ({
    id: res.id,
    name: res.name,
    owner: res.owner.login,
    url: res.html_url,
    size: res.size,
    forks: res.forks,
    watchers: res.watchers
  })
  repos.save()
  .catch((err) => {
    console.log(err);
  });
}

let read = (callback) => {
  Repo.find({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

let findTop = (callback) => {
  Repo.where('size')
  .sort({'size':-1})
  .limit(30)
  .exec(callback)
};

module.exports.save = save;
module.exports.drop = drop;
module.exports.findTop = findTop;
module.exports.read = read;
module.exports.Repo = Repo;