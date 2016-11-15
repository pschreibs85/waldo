'use strict'
// file containing functions for interacting with database
let config = require('./knexfile');
let knex = require('knex')(config);

module.exports = knex;

//creates db schema
knex.ensureSchema = () => {
  return Promise.all([
    knex.schema.hasTable('photos').then( (exists) => {
      console.log("photos table exists:", exists)
      if (!exists) {
        knex.schema.createTable('photos', (table) => {
          table.increments('id').primary();
          table.string('key', 255);
          table.string('last_modified', 255);
          table.string('e_tag', 255);
          table.string('size', 255);
          table.string('storage_class', 255);
        }).then( (table) => {
          console.log('Created photos table.');
        })
      }
    })
  ])
}

//deletes table
knex.truncateTable = (tableName) => {
  return knex(tableName).truncate()
    .then( () => {
      console.log("Deleted "+ tableName)
  })
}

//closes db connection
knex.closeDb = () => {
  knex.destroy().then( () => {
    console.log("Closed sqlite3 connection")
  })
}

//inserts photo object
knex.insertPhoto = (photoObj) => {  
  let standardizedPhotoObj = {
    key: photoObj.Key[0],
    last_modified: photoObj.LastModified[0],
    e_tag: photoObj.ETag[0],
    size: photoObj.Size[0],
    storage_class: photoObj.StorageClass[0]
  }

  console.log("inserting photo:", standardizedPhotoObj) 
  return knex('photos').insert(standardizedPhotoObj).then(knex.closeDb)
}


knex.ensureSchema();





