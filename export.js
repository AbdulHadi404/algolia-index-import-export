// export.js
// This script takes the Algolia app id and api key and exports all the indices into a json file
// Usage: node export.js <app_id> <api_key>

const fs = require("fs");
const algoliasearch = require("algoliasearch");

// Get the app id and api key from the command line arguments
const app_id = "YOUR_ALGOLIA_APPLICATION_ID";
const api_key = "YOUR_ALGOLIA_WRITE_API_KEY";

// Create a client instance with the app id and api key
const client = algoliasearch(app_id, api_key);

// Get the list of all indices in the app
client.listIndices().then((indices) => {
  // Create an empty object to store the index data
  const data = {};

  // Loop through each index and get its settings, synonyms and objects
  // Store the promises in an array
  const promises = [];
  for (let index of indices.items) {
    const name = index.name;
    console.log(`Exporting index ${name}...`);
    // Get the index instance
    index = client.initIndex(name);
    // Get the index settings and store the promise
    const promise = index.getSettings().then((settings) => {
      console.log(settings);
      // Get the index synonyms
      // const synonyms = index.browseSynonyms();
      // Get the index objects
      // const objects = index.browseObjects({query: ""});
      // Store the index data in the object
      data[name] = {
        settings: settings,
        // synonyms: [...synonyms],
        // objects: [...objects]
      };
    });
    promises.push(promise);
  }

  // Wait for all the promises to resolve
  Promise.all(promises).then(() => {
    // Write the object to a json file
    fs.writeFile("export.json", JSON.stringify(data, null, 4), (err) => {
      if (err) throw err;
      console.log("Done exporting all indices.");
    });
  });
});
