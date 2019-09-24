//wraps function to make it async
const asyncMiddleware = fn => (request, response, next) => {
    Promise.resolve(fn(request, response, next)).catch(next);
  };
  
  export default asyncMiddleware;