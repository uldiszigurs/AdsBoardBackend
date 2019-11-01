//this function is to handle multiple controllers for a single path, since middlewares should not access 
//the database (AFAIK) this will chain multiple controllers, if one fails, the one after fails too.

  const controllerWrapper = (...functions) => async (request, response, error) => {
      try {
        const length = functions.length;
        const results = [];
        console.dir(functions);
        for (let i = 0; i < length; ++i) {
            const result = await functions[i](request, response);
            console.log({['result'+i]: result});
            if (i === length -1) { //last function's response gets sent
                response.status(200).send({ payload: {savedDocument : result} });
            }
            
    }
    console.log(results);
      } catch(error) {
          console.log(error);
      }
    

  };

export default controllerWrapper;

// 1+ controllers
//last controller's return value gets sent