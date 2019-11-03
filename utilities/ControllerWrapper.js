//by default it will return first controller's response.
//TODO: http status codes

//what about fallback? in case any controller fails to push/fetch something to db - should undo all changes
  const controllerWrapper = (...functions) => async (request, response, error) => {
      try { //TODO: Add validation to controllers
        const defualtReturn = 0; //this will be optional parameter to provide to controllerWrapper, in case 
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
            if (i === (length - 1)) { //last function's response gets sent, currently with 200 status code 
                response.status(200).send({ payload: { data : returnResult} });
            }
            
    }
    console.log(results);
      } catch(error) {
          console.log(error);
      }
    

  };

export default controllerWrapper;