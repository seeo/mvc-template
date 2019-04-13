module.exports = (db) => {

  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  // let indexControllerCallback = (request, response) => {
  //     db.pokemon.getAll((error, allPokemon) => {
  //       response.render('pokemon/index', { allPokemon });
  //     });
  // };
  //
  const getControllerCallback = (request, response) => {
      // use pokemon model method `get` to retrieve pokemon data
      db.pokemon.get(request.params.id, (error, queryResult) => {
        // queryResult contains pokemon data returned from the pokemon model
        if (error) {
          console.error('error getting pokemon:', error);
          response.sendStatus(500);
        } else {
          // render pokemon view in the pokemon folder
          response.render('pokemon/Pokemon', { pokemon: queryResult.rows[0]});
        }
      });
  };

  const updateFormControllerCallback = (request, response) => {
      // TODO: Add logic here

      // db.pokemon.get(request.params.id, (error, queryResult) => {
      //   // queryResult contains pokemon data returned from the pokemon model
      //   if (error) {
      //     console.error('error getting pokemon:', error);
      //     response.sendStatus(500);
      //   } else {
      //     // render pokemon view in the pokemon folder
      //     response.render('pokemon/edit', { pokemon: queryResult.rows[0]});
      //   }
      // });
  };

  const updateControllerCallback = (request, response) => {
      // TODO: Add logic here
  };

  const createFormControllerCallback = (request, response) => {
    response.render('pokemon/new');
  };

  const createControllerCallback = (request, response) => {
      // use pokemon model method `create` to create new pokemon entry in db
      db.pokemon.create(request.body, (error, queryResult) => {
        // queryResult of creation is not useful to us, so we ignore it
        // (console log it to see for yourself)
        // (you can choose to omit it completely from the function parameters)

        if (error) {
          console.error('error getting pokemon:', error);
          response.sendStatus(500);
        }

        if (queryResult.rowCount >= 1) {
          console.log('Pokemon created successfully');
        } else {
          console.log('Pokemon could not be created');
        }
        // redirect to home page after creation
        response.redirect('/');
      });
  };


  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    get: getControllerCallback,
    createForm: createFormControllerCallback,
    create: createControllerCallback,
  };

}
