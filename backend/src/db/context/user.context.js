const { User } = require("../../models")

const getUserDetails = async(userId) => {
    const user = await User.findOne({ _id: userId }).select("-password")
    return user
}

const updateUserDetails = async(userId, payload) => {
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
        new:true
    })
    return updatedUser
}

module.exports={getUserDetails,updateUserDetails}