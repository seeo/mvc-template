/*Configuration
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */

const pg = require('pg');
// require every single model file in your app
const pokemon = require('./models/pokemon');

const url = require('url');

var configs;

  configs = {
    user: 'siangeeeo',
    host: '127.0.0.1',
    database: 'mydb',
    port: 5432
  };

//1. the db.js sets up the db connection pool
const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});
/* Require Model Files
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======        REQUIRE MODEL FILES         =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */

 // export an object with every single model in it

 // give the model the DB handler pool
 const pokemonForExport = pokemon(pool);


//2. db.js includes the model files
//the model file include is a function- it gets executed so that the models themselves get an instance of the pool connection.
const allPokemonModelsFunction = require('./models/pokemon');

const pokemonModelsObject = allPokemonModelsFunction( pool );



/*Module Exports
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======          MODULE EXPORTS            =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */


module.exports = {
  /*
   * ADD APP MODELS HERE
   */
  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  // get a reference to end the connection pool at server end
  // pool has been defined as a function above that links to postgres configs
  pool:pool,
  // users: userModelsObject,
  // pokemonModelsObject has been defined above as a function that requires models/pokemon.js takes in pool as an argument
  // pokemon: pokemonModelsObject
  pokemon: pokemonForExport
};
