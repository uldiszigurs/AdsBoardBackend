//this function is to handle multiple controllers for a single path, since middlewares should not access 
//the database (AFAIK) this will chain multiple controllers, if one fails, the one after fails too.

//current in-work wrapper only works with 2 functions properly (because of DB) needs fix;
//should make promise.all but problem is that it will be done in db, maybe a way to simulate db action
//and see if it would pass or not? FIXME: TODO: 
//still going to need to remove .send({payload}) from all controllers
const controllerWrapper = (...functions) => (request, response, next) => {
    functions.forEach((controllerFunction) => {
        Promise.resolve(controllerFunction(request, response, next)).catch(next);
    })
    
}
export default controllerWrapper;

