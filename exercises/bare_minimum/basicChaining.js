/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var user = require('./promisification.js');
var constructor = require('./promiseConstructor.js');

var writeToFile = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = (readFilePath, writeFilePath) => {
  return constructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return user.getGitHubProfileAsync(username);
    })
    .then((profile) => {
      return writeToFile(writeFilePath, JSON.stringify(profile));
    });
};

module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};