//this function is to handle multiple controllers for a single path, since middlewares should not access 
//the database (AFAIK) this will chain multiple controllers, if one fails, the one after fails too.

//current in-work wrapper only works with 2 functions properly (because of DB) needs fix;
//should make promise.all but problem is that it will be done in db, maybe a way to simulate db action
//and see if it would pass or not? FIXME: TODO: 
const controllerWrapper = async (...functions) => {
    functions.reduce((item, index) => {
        if (typeof item != 'function') {
            throw new Error(`${index}th argument is not a function! Provide all arguments of type function!`);
        }
        const result = await item();
        if (result instanceof Array) {
            return //either validate and return true or return raw response TODO: 
        }
        
    })


export default controllerWrapper;

