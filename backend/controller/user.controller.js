import User from "../model/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import createToken from "../utils/generateToken.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please field all fields are required");
  }

  const userExisting = await User.findOne({ email });

  if (userExisting) res.status(400).json({ message: "User already exist..." });

  // hash the user password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const existingEmail = await User.findOne({ email });

  if (!existingEmail) {
    return res.status(400).json({ message: "User not found!" });
  }

  // Validate the password
  const isPasswordValid = await bcrypt.compare(
    password,
    existingEmail.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password!" });
  }

  // Generate a token and send a successful response
  createToken(res, existingEmail._id);

  return res.status(200).json({
    _id: existingEmail._id,
    username: existingEmail.username,
    email: existingEmail.email,
    isAdmin: existingEmail.isAdmin,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successfully user !" });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

export const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(user);
});

export const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const newUser = await user.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400).json({ message: "User not founded ~" });
  }
});
