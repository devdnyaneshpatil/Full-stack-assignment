const { v4: uuidv4 } = require("uuid");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // we get email here so what we want we do
      const email = profile._json.email;
      const profileImage = profile.photos[0]?.value; // Profile image URL
      const userName = profile.displayName; // User's display name

      // Create a user object
      const user = {
        email,
        userName,  // Include userName
        profileImage,  // Include the profile image
        password: uuidv4(),  // Generate a random password
      };
      return cb(null, user);
    }
  )
);

module.exports = { passport };