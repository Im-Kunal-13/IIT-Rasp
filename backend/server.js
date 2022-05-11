const path = require('path')
// Requiring Express
const express = require("express")
// Requiring Colors through which we can apply different colors to console outputs.
const colors = require("colors")
// Requiring dotenv to use environment variables.
const dotenv = require('dotenv').config()
// Error Handler Middleware which we created that overrides the default express error handler. 
const {errorHandler} = require("./middleware/errorMiddleware")
// Function to connect to the database. 
const connectDB = require("./config/db")
// Importing cors
const cors = require("cors")
// Importing admin roiutes 
const adminRoutes = require("./routes/adminRoutes")
// Importing admin roiutes 
const dataRoutes = require("./routes/dataRoutes")

// For some reason if one of the ports doesn't work, then the other will be used. 
const port = process.env.PORT || 5000

// As soon as we start the server, we call the function to connect to the Mongo DB database. 
connectDB()

// Initializing express.
const app = express()

// Using cors
app.use(cors())

app.use(express.static(__dirname + '/public'));

// Activating Body Parser in express
app.use(express.json())
// Activating http headers to use url encoded json.
app.use(express.urlencoded({extended: false}))

// ROUTES 
// admins routes appended with further routes 
app.use("/api/admins", adminRoutes)

// admins routes appended with further routes 
app.use("/api/data", dataRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }
  

// This will overirde the default express errorHandler.
app.use(errorHandler)

// Listening to the port which we set up. 
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
