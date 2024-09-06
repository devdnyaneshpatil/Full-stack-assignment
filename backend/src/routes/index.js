const router = require("express").Router()

router.use("/auth", require("./auth.routes"))
router.use("/task",require("./task.routes"))

module.exports=router