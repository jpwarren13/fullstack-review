const request = require('request');
const config = require('../config.js');
const axios = require('axios');

let getReposByUsername = (username, callback) => {
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    direction: 'desc',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
  .then((response) => {
    callback(response);
  })
  .catch(error => {
    console.log(error);
  })
}

module.exports.getReposByUsername = getReposByUsername;