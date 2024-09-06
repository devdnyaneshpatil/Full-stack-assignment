const {  registerController, loginController } = require("../controllers/auth.controllers")

const authRouter = require("express").Router()

authRouter.post("/sign-up", registerController)
authRouter.post("/login",loginController)

module.exports=authRouter