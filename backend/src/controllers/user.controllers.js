const userContext = require("../db/context/user.context");
const CustomError = require("../utils/customError");
const getUserDetailsController = async (req, res, next) => {
  try {
    const user = (await userContext.getUserDetails(req.userId)) || {};
    return res.status(200).json({ data: user });
  } catch (error) {
    const err = new CustomError(`Internal Server Error ${error.message}`, 500);
    return next(err);
  }
};

const updateUserDetailsController = async (req, res, next) => {
  try {
    let updateObj = {};

    // Log req.file to debug file upload issues
    if (req.file) {
      updateObj.profileImage = req.file.filename;
    }

    if (req.body.userName) {
      updateObj.userName = req.body.userName;
    }

    // Check if there are any fields to update
    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ msg: "No data to update" });
    }

    // Update user details
    const updatedUser = await userContext.updateUserDetails(req.userId, updateObj);

    // Check if update was successful
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User updated successfully", data: updatedUser });
  } catch (error) {
    const err = new CustomError(`Internal Server Error: ${error.message}`, 500);
    return next(err);
  }
};


module.exports = { getUserDetailsController, updateUserDetailsController };
