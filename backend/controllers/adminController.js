// importing Json Web Token.
const jwt = require("jsonwebtoken");
// importing bcrypt js to encrypt the password.
const bcrypt = require("bcryptjs");
// importing Express async handler.
const asyncHandler = require("express-async-handler");
// importing the admin Schema Model for our database.
const Admin = require("../models/adminModel");

// @Desciption -> Register New Admin
// @Route -> POST /api/admins/
// @Access -> Public
const registerAdmin = asyncHandler(async (req, res) => {
  // Destruction from req.body.
  const { name, email, phone, organization, administrator, password } =
    req.body;

  // If either of them are not present then throwing error.
  if (!name || !email || !phone || !organization || !password) {
    throw new Error("Please enter all the fields.");
  }

  // Chec if a admin already exists.
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    // Sending response status.
    res.status(400);
    // Throwing Error.
    throw new Error("Admin already exists.");
  }

  // Hash password.
  // Creating Salt for the password.
  const salt = await bcrypt.genSalt(10);
  // Hasing the text password using the text password and the salt.
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin with the input data.
  const admin = await Admin.create({
    name,
    email,
    phone,
    organization,
    administrator,
    password: hashedPassword,
  });

  // Checking if adminf is present.
  if (admin) {
    // Sending ok status 201 which means we have entered something.
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      organization: admin.organization,
      administrator: admin.administrator,
      // Passing the generated token with the function we created.
      token: generateToken(admin.id),
    });
  } else {
    // Sending the status.
    res.status(400);
    // Throwing error.
    throw new Error("Invalid Admin Data.");
  }
});

// @Desciption -> Authenticate an Admin
// @Route -> POST /api/admin/login
// @Access -> Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checking for email
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      organization: admin.organization,
      administrator: admin.administrator,
      token: generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials.");
  }
});

// @Desciption -> Get All Admins
// @Route -> GET /api/admins/
// @Access -> Private
const getAdmins = asyncHandler(async (req, res) => {
  // Getting the admin from the id set in the req.admin via the middleware.
  const admins = await Admin.find();

  res.status(200).json(admins);
});

// @Desciption -> Get Admin Data
// @Route -> GET /api/admins/me
// @Access -> Private
const getMe = asyncHandler(async (req, res) => {
  // Getting the admin from the id set in the req.admin via the middleware.
  const { _id, name, email } = await Admin.findById(req.admin.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc    Delete goal
// @route   DELETE /api/admins/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const userExists = await Admin.findById(req.params.id);
  // Chec if an admin exists.
  if (!userExists) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check for user
  if (!req.admin) {
    res.status(401);
    throw new Error("Admin not logged in.");
  }

  await userExists.remove();

  res
    .status(200)
    .json({ id: req.params.id, message: "User deleted successfully." });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const userExists = await Admin.findById(req.params.id);

  if (!userExists) {
    res.status(400);
    throw new Error("User not found");
  }

  const { name, email, phone, organization, administrator, password } =
    req.body;

  let updateUserData;
  if (!password) {
    updateUserData = { name, email, phone, organization, administrator };
  } else {
    // Hash password.
    // Creating Salt for the password.
    const salt = await bcrypt.genSalt(10);
    // Hasing the text password using the text password and the salt.
    const hashedPassword = await bcrypt.hash(password, salt);
    updateUserData = {
      name,
      email,
      phone,
      organization,
      administrator,
      password: hashedPassword,
    };
  }

  // // Check for user
  // if (!req.admin) {
  //   res.status(401);
  //   throw new Error("Admin not logged in.");
  // }

  // // Make sure the logged in user is an administrator.
  // if (!req.admin.administrator) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  const updatedUser = await Admin.findByIdAndUpdate(
    req.params.id,
    updateUserData,
    {
      new: true,
    }
  );

  res
    .status(200)
    .json({ user: updatedUser, message: "user updated successfully" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getMe,
  getAdmins,
  deleteUser,
  updateUser,
};
