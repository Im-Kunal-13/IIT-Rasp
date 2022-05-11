// Requiring Mongoose. 
const mongoose = require("mongoose");

// Creating the goal Schema model for our database in mongoose as by default we don't have to provide any Schema. 
const goalSchema = new mongoose.Schema(
  {
    // Setting the user id so that we can filter the goals of a single user. 
    userId: {
      // Setting the type to id which by default mongo db provides. 
      type: mongoose.Schema.Types.ObjectId,
      // Required : true meanins it has to be provided and if not provided will show an error message. 
      required: true,
      // Setting the reference to which data collection we are refering to.
      ref: "User",
    },
    text: {
      // Type checking.
      type: String,
      // Required : true meanins it has to be provided and if not provided will show an error message. 
      required: [true, "Please add a text value"],
    },
  },
  {
    // This will automatically create the timestamps of data created.
    timestamps: true,
  }
);

// Exporting the model created. 
module.exports = mongoose.model("Goal", goalSchema);
