const asyncHandler = require("express-async-handler");
const Visiter = require("../models/visiterModel");
const admin = require("../models/visiterModel");

// @Description -> Get visiters.
// @Route -> GET /api/visiters
// @Acess -> Private
const getVisiters = asyncHandler(async (req, res) => {
  const goals = await Visiter.find();

  res.status(200).send(goals);
});

// @Description -> Set visiter.
// @Route -> POST /api/visiters
// @Acess -> Private
const setVisister = asyncHandler(async (req, res) => {
  if (
    !req.body.adminId ||
    !req.body.ipAddress ||
    !req.body.loginTime ||
    !req.body.logoutTime
  ) {
    res.status(400);
    throw new Error("Please enter all the input fields!");
  }

  const visiter = await Visiter.create({
    adminId: req.body.adminId,
    ipAddress: req.body.ipAddress,
    loginTime: req.body.loginTime,
    logoutTime: req.body.logoutTime,
  });

  res.status(200).send(visiter);
});

module.exports = {
  getVisiters,
  setVisister,
};
