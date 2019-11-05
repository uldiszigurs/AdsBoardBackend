//by default it will return first controller's response.
//TODO: http status codes

//what about fallback? in case any controller fails to push/fetch something to db - should undo all changes

const controllerWrapper = (...functions) => async (request, response, error) => { 
    //this wraps multiple controllers to act as one
    //each function returns data object and a statuscode
    try { 
        const defualtReturn = 0; /* this will be optional parameter to provide to controllerWrapper, 
        which will determine which controller should return it's value */
        let returnResult;
        const length = functions.length; //amount of arguments provided
        const fallBack = []; //for .put / .post / .delete http methods fallback functions
        console.dir(functions); //for debugging
        for ( let i = 0; i < length; i++ ) { //iterate over all given arguments (functions)
            if (typeof functions[i] !== 'function') {
                throw new Error(`Please provide all arguments as functions! 
                ${functions[i]} is not a function!`);
            }
            const result = await functions[i](request, response); //await all provided functions
            console.log({[`result${i}`]: result}); //debugging
            if (i === defualtReturn) { //set the return value based on default / provided variable defaultReturn
              returnResult = result;
            }
            
            
    }
    if (true) { //redundant for now but later perhaps will be used.
        const {data, statusCode, error} = returnResult;
        if(returnResult instanceof Object && Object.prototype.hasOwnProperty.call(returnResult, 'error')) { //if error has occured set status code
            statusCode = 400;
            response.status(statusCode).send({error});
          }
        response.status(statusCode).send({ payload: {data} });
    }
      } catch(error) {
          console.log(error);
      }
  };
//each controller should return data payload, http status code
export default controllerWrapper;