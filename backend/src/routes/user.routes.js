const { getUserDetailsController, updateUserDetailsController } = require("../controllers/user.controllers")
const auth = require("../middlewares/auth.middleware")
const upload = require("../utils/multer")

const userRouter = require("express").Router()

userRouter.get("/", auth, getUserDetailsController)
userRouter.patch("/",auth,upload.single("profileImage"),updateUserDetailsController)

module.exports=userRouter