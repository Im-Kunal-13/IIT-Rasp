// Requiring Mongoose. 
const mongoose = require("mongoose");

// Creating the visiter Schema model for our database in mongoose as by default we don't have to provide any Schema. 
const visiterSchema = new mongoose.Schema(
    {
      // Setting the user id so that we can filter the visiters of a single user. 
      adminId: {
        // Setting the type to id which by default mongo db provides. 
        type: mongoose.Schema.Types.ObjectId,
        // Required : true meanins it has to be provided and if not provided will show an error message. 
        required: true,
        // Setting the reference to which data collection we are refering to.
        ref: "Admin",
      },
      ipAddress: {
        // Type checking.
        type: String,
        // Required : true meanins it has to be provided and if not provided will show an error message. 
        required: [true, "Please add a text value"],
      },
      loginTime: {
          type: String,
          required: [true, "Please enter a login time"]
      },
      logoutTime: {
          type: String, 
          required: [true, "Please enter a logout time"]
      }
    },
    {
      // This will automatically create the timestamps of data created.
      timestamps: true,
    }
  );

// Exporting the model created. 
module.exports = mongoose.model("Visiter", visiterSchema);
