module.exports = (app, db) => {
//pass the db from routes so that we can use them
//the routes file is a function, it is called with the express app instance and the db object

  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  // every controller function gets included at the top of the routes file...
  // changed 'pokemonControllerCallbacks' to 'pokemons' and then changed the argument from 'allModels' to 'db'
  const pokemons = require('./controllers/pokemon')(db);

//each matching string route is in this file. for every route it gets a controller function
//(that controller function has already been passed the db instance

//changed 'pokemonControllerCallbacks.index' to pokemons.create;
  app.get('/pokemons', pokemons.create);
  app.get('pokemon/:id', pokemons.get);
  // app.get('/pokemons/:id/edit', pokemons.updateForm);
  // app.post('/pokemons/:id/edit', pokemons.update);
  app.get('/pokemons/new', pokemons.createForm);


  //app.get('/pokemons/:id', pokemons.getPokemon);
};
