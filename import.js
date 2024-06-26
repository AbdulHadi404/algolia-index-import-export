// import.js
// This script takes the Algolia app id and api key and imports all the indices from a json file
// Usage: node import.js <app_id> <api_key>

const fs = require("fs");
const algoliasearch = require("algoliasearch");

// Get the app id and api key from the command line arguments
const app_id = "YOUR_ALGOLIA_APPLICATION_ID";
const api_key = "YOUR_ALGOLIA_WRITE_API_KEY";

// Create a client instance with the app id and api key
const client = algoliasearch(app_id, api_key);

// Read the json file with the index data
fs.readFile("export.json", "utf8", (err, data) => {
  if (err) throw err;
  data = JSON.parse(data);

  // Loop through each index and set its settings, synonyms and objects
  for (let name in data) {
    console.log(`Importing index ${name}...`);
    // Get the index instance or create it if it does not exist
    let index = client.initIndex(name);
    // Set the index settings
    let settings = data[name]["settings"];
    index.setSettings(settings);
    // Set the index synonyms
    // let synonyms = data[name]["synonyms"];
    // index.replaceAllSynonyms(synonyms);
    // Set the index objects
    // let objects = data[name]["objects"];
    // index.replaceAllObjects(objects);
  }

  console.log("Done importing all indices.");
});
