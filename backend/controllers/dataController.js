// importing Express async handler.
const asyncHandler = require("express-async-handler");
// importing the admin Schema Model for our database.
const Data = require("../models/dataModel");

// @Desciption -> Get All data
// @Route -> GET /api/data/
// @Access -> Private
const getData = asyncHandler(async (req, res) => {
    console.log("get data entered");
  // Getting all data of the model type 'Data' here.
  const data = await Data.find();

  res.status(200).json(data);
});

module.exports = {
  getData,
};
