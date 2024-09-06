const CustomError = require("../utils/customError");
const authContext = require("../db/context/auth.context");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, HASH_SALT } = require("../config/constants");
const isValidData = require("../utils/dataValidator");

const registerController = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const validate = isValidData(req.body, ["userName", "password", "email"]);
    if (validate !== true) {
      const err = new CustomError(validate, 400);
      return next(err);
    }
    const isUserExist = await authContext.getUserByUserEmail(email);
    if (isUserExist) {
      const err = new CustomError(`User Already Exist`, 429);
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, HASH_SALT);
    const userObj = {
      email,
      userName,
      password: hashedPassword,
    };
    const newUser = await authContext.createNewUser(userObj);
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res.status(201).json({
      msg: "User created successfully",
      userObj: {
        userName: newUser.userName,
        email: newUser.email,
        id: newUser._id,
        token,
      },
    });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validate = isValidData(req.body, ["email", "password"]);
    if (validate !== true) {
      const err = new CustomError(validate, 400);
      return next(err);
    }
    const isUserAvailable = await authContext.getUserByUserEmail(email);
    if (!isUserAvailable) {
      const err = new CustomError(`User Doesn't Exist`, 404);
      return next(err);
    }
    const checkPassword = await bcrypt.compare(
      password,
      isUserAvailable.password
    );
    if (!checkPassword) {
      const err = new CustomError(`Incorrect Password`, 401);
      return next(err);
    }
    const token = jwt.sign({ userId: isUserAvailable._id }, JWT_SECRET);
    return res.status(200).json({
      msg: "User LoggedIn Successfully",
      userObj: {
        userName: isUserAvailable.userName,
        email: isUserAvailable.email,
        id: isUserAvailable._id,
        token,
      },
    });
  } catch (error) {
    const err = new CustomError(
      `Internal Server Error:- ${error.message}`,
      500
    );
    return next(err);
  }
};

module.exports = { registerController, loginController };
