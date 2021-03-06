const http = require('http');
const parseString = require('xml2js').parseString;
const knex = require('./db/db')

//Sends a GET request to the S3 bucket, transfroms data from XML to JSON and inserts into local database

function getS3DataFromAmazon(callback) {
  return http.get({
    host: 's3.amazonaws.com',
    path: '/waldo-recruiting'
  }, (res) => {
    let body = '';
    res.on('data', (thunk) => {
       body += thunk;
    });
    res.on('end', () => {
      return callback(body, (err, res) => {
        const dataToInsert = res.ListBucketResult.Contents;
        dataToInsert.forEach( (val, i) => {
          console.log("=========================")
          console.log(i)
          knex.insertPhoto(val)
        })
      })
	  })
	})
}


getS3DataFromAmazon(parseString)
