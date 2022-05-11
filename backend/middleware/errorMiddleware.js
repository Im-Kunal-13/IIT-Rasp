// Here middlewares are stuff that work betwen request and response.

// Creating the middleware function that will override the default express handler.
const errorHandler = (err, req, res, next) => {
  // If status code is present then set it, otherwise set it to 500.
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Sending the status code in the response. 
  res.status(statusCode);

  // Returning respond in the form of json data.
  res.json({
    message: err.message,
    // checking if our app is in production or development via data stored in environment variables. 
    // If production then we won't print the error.stack.
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Exporting the middleware function we created. 
module.exports = {
    errorHandler,  
}