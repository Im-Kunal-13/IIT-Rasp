// Requiring mongoose.
const mongoose = require("mongoose");

// Creating the Admin Schema model for our database in mongoose as by default we don't have to provide any Schema.
const adminSchema = new mongoose.Schema(
  {
    name: {
      // Type checking.
      type: String,
      // Required : true meanins it has to be provided and if not provided will show an error message.
      required: [true, "Please add a name"],
    },
    email: {
      // Type checking.
      type: String,
      // Required : true meanins it has to be provided and if not provided will show an error message.
      required: [true, "Please add an email"],
      // If we use unique: true then no other document can have the same value of this key in the collection.
      unique: true,
    },
    phone: {
      // Type checking.
      type: Number,
      // Required : true meanins it has to be provided and if not provided will show an error message.
      // If we use unique: true then no other document can have the same value of this key in the collection.
      unique: true,
    },
    organization: {
      // Type checking.
      type: String,
      // Required : true meanins it has to be provided and if not provided will show an error message.
      // If we use unique: true then no other document can have the same value of this key in the collection.
      required: [true, "Please enter your organization"],
    },
    administrator: {
      type: Boolean,
      required: [true, "Please enter whether the user is an administrator"],
    },
    password: {
      // Type checking.
      type: String,
      // Required : true meanins it has to be provided and if not provided will show an error message.
      required: [true, "Please add a password"],
    },
  },
  {
    // This will automatically create the timestamps of data created.
    timestamps: true,
  }
);

// Exporting the model created.
module.exports = mongoose.model("Admin", adminSchema);
