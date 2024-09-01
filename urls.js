const fs = require('fs');
const axios = require('axios');
const path = require('path');

const filename = process.argv[2];

// Function to download and save the HTML content
async function downloadAndSave(url) {
  try {
    const response = await axios.get(url);
    const hostname = new URL(url).hostname;
    const outputFile = path.join(__dirname, hostname);
    
    fs.writeFileSync(outputFile, response.data);
    console.log(`Wrote to ${hostname}`);
  } catch (error) {
    console.error(`Couldn't download ${url}`);
  }
}

// Main function to read the file and process each URL
function processFile(filename) {
  try {
    const urls = fs.readFileSync(filename, 'utf8').split('\n').filter(Boolean);

    // Bonus: Start all the downloads at once
    const promises = urls.map(url => downloadAndSave(url));
    Promise.all(promises)
      .then(() => console.log('All downloads complete'))
      .catch(err => console.error('An error occurred:', err));
  } catch (err) {
    console.error(`Couldn't read file: ${filename}`);
  }
}

// Run the script
if (filename) {
  processFile(filename);
} else {
  console.error('Please provide a filename as an argument');
}
