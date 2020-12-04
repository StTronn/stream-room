import jwt from "jsonwebtoken";
import User from "../models/user";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import passportJWT from "passport-jwt";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  User.findById(jwt_payload.id, (err, user) => {
    if (
      !user ||
      jwt.verify(user.token, process.env.JWT_SECRET).id !== jwt_payload.id
    ) {
      return next(null, false);
    }
    return next(null, user);
  });
});

passport.use(strategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleId: profile.email }, async (err, user) => {
        if (err) return done(err);
        if (!user) {
          const newUser = await User.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            username: profile.id,
          });
          const token = newUser.getJwtToken();
          return done(null, { token });
        } else {
          const token = user.getJwtToken();
          return done(null, { token });
        }
      });
    }
  )
);

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return next({
        statusCode: 401,
        message: "invalid token",
      });

    const user = await User.findById(decoded.id);
    if (!user || user.token !== token) {
      return next({
        statusCode: 401,
        message: "invalid token",
      });
    }

    // add user to req for next middleware/fn
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next({
      statusCode: 403,
      message: "You need to be logged in to to visit this route",
    });
  }
};

export default authenticate;
