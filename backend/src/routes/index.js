const router = require("express").Router()

router.use("/auth", require("./auth.routes"))
router.use("/task", require("./task.routes"))
router.use("/user",require("./user.routes"))

module.exports=router