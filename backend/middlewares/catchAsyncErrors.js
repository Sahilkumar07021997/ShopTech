// this basically to handle all the async errors...

module.exports = func => {
  return   (req, res, next) => {          //anonmous function for async errors...
        Promise.resolve(func(req, res, next)).catch(next);
    };
} 