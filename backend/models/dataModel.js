// Requiring mongoose.
const mongoose = require("mongoose");

// Creating the Data Schema model for our database in mongoose as by default we don't have to provide any Schema.
const dataSchema = new mongoose.Schema({
  data: {
    // Type checking.
    type: String,
    // Required : true meanins it has to be provided and if not provided will show an error message.
    required: [true, "Please add data"],
  },
  time: {
    // Type checking.
    type: String,
    // Required : true meanins it has to be provided and if not provided will show an error message.
    required: [true, "Please add a name"],
  },
  date: {
    // Type checking.
    type: String,
    // Required : true meanins it has to be provided and if not provided will show an error message.
    required: [true, "Please add a name"],
  },
});

// Exporting the model created.
module.exports = mongoose.model("Data", dataSchema, "flowRate");
