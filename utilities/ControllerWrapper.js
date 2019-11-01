//by default it will return first controller's response.
  const controllerWrapper = (...functions) => async (request, response, error) => {
      try { //TODO: Add validation to controllers
        const defualtReturn = 0;
        let returnResult;
        const length = functions.length; //amount of arguments provided
        const results = [];
        console.dir(functions);
        for (let i = 0; i < length; ++i) {
            const result = await functions[i](request, response);
            console.log({['result' + i]: result});
            if (i === defualtReturn) {
              returnResult = result;
            }
            if (i === (length - 1)) { //last function's response gets sent
                response.status(200).send({ payload: {savedDocument : returnResult} });
            }
            
    }
    console.log(results);
      } catch(error) {
          console.log(error);
      }
    

  };

export default controllerWrapper;