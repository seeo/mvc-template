const express = require('express');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set up middleware
app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(express.static('public'));

app.use(express.urlencoded({
  extended: true
}));

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * ===================================
 *                DB
 * ===================================
 * ===================================
 */

// db contains *ALL* of our models
// require the 'db' file here, change name of 'allModels' to 'db'
const db = require('./db');
/**
 * ===================================
 * ===================================
 * Routes
 * ===================================
 * ===================================
 */

// get the thing that contains all the routes
const setRoutesFunction = require('./routes');
// call it and pass in the "app" so that we can set routes on it (also 'db' or 'allModels')
// we pass all of the db.js stuff into 'setRoutesFunction that takes 'app' and db as arguments;
setRoutesFunction(app, db);

//alternatively, another way to write and combine both require('./routes') and (app,db) is to use:
//require('./routes')(app,db);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  server.close(() => {
    console.log('Process terminated')
    allModels.pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);
