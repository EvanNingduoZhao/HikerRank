const togeojson = require("@mapbox/togeojson");
const DomParser = require("xmldom").DOMParser; // node doesn't have xml parsing or a dom.
const fs = require("fs");
const mysql = require('mysql');
const path = require('path');

const directoryPath = path.join(__dirname, 'gpxfiles')

const connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "hikerrank"
});

fs.readdir(directoryPath, function(err, files) {
  if(err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function(file) {
    const fileParsedFromDom = new DomParser().parseFromString(
      fs.readFileSync(directoryPath + '/' + file, "utf-8")
    );
    // // Convert GPX to GeoJSON
    let converted = JSON.stringify(togeojson.gpx(fileParsedFromDom));
    let parsedJson = JSON.parse(converted)
    let trailname = parsedJson['features'][0]['properties']['name'];

    let data = [converted, trailname]
    const sql = "update hikerrank_trail set map_info=? where name=?";
    connection.query(sql, data, (err) => {
      if(err) {
        return console.error(err.message);
      }
      console.log('added to table');
    });
  });
});

// connection.end();