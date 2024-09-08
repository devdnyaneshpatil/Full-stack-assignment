const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/customError");
const errorHandler = require("./middlewares/error.middleware");
const { passport } = require("./utils/gauth");
const authContext = require("./db/context/auth.context");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config/constants");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "../images")));
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Is Healthy",
    pid: process.pid,
    uptime: process.uptime(),
  });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  async function (req, res) {
    // Successful authentication
    const isUserAvailable = await authContext.getUserByUserEmail(
      req.user.email
    );

    let user, token;

    if (isUserAvailable) {
      token = jwt.sign({ userId: isUserAvailable._id }, JWT_SECRET);
      user = isUserAvailable;
    } else {
      user = await authContext.createNewUser(req.user);
      token = jwt.sign({ userId: user._id }, JWT_SECRET);
    }

    // Return the token and user data to the frontend
    // return res.status(200).json({
    //   msg: "User LoggedIn Successfully",
    //   userObj: {
    //     userName: user.userName,
    //     email: user.email,
    //     id: user._id,
    //     token,
    //   },
    // });
    res.redirect(
      `https://full-stack-assignment-livid.vercel.app/home?token=${token}`
    );
  }
);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(errorHandler);

module.exports = app;
