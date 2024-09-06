const { User }= require("../../models/index")

const getUserByUserEmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}

const createNewUser = async (payload) => {
    const newUser = new User(payload).save()
    return newUser
}

module.exports={getUserByUserEmail,createNewUser}