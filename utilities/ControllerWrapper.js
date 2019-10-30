//this function is to handle multiple controllers for a single path, since middlewares should not access 
//the database (AFAIK) this will chain multiple controllers, if one fails, the one after fails too.

const controllerWrapper = (...functions) => (request, response) => {//doesnt work at all.
    const asyncWrapper = async (item) => {
        await item();
        return item;
    }
    const accumulatedResult = () => new Promise ((resolve, reject) => {
        const rez = [];
        resolve(functions.forEach((value) => {
            return async () => {
                const funcRez = await value();
                console.log(funcRez);
                rez.push(funcRez);
            }
        }));
        console.log(rez);
    })
    const rezz = asyncWrapper(accumulatedResult);
    response.status(200).send({ payload: { rezz } });
    console.log('Finished executing controllerWrapper.');
}
export default controllerWrapper;

// 1+ controllers
//last controller's return value gets sent
