import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { findById } from '../src/repository/user.repository.mjs';
import jwt from "jsonwebtoken";


// Validate Token
const JWTStrategy   = Strategy;
const ExtractJWT = ExtractJwt;
const a = passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET_KEY
},
  async function (jwtPayload, done) {
    try {
      console.log(done);
      const user = await findById(jwtPayload.user);
      return done(null, user);
    }
    catch (err) {
      return done(err);
    }
  }
));

/**
 * Gneerate Token When Login
 * @param {*} user 
 * @returns 
 */
function generateAccessToken(user)
{
    return jwt.sign(user, process.env.AUTH_SECRET_KEY, { expiresIn: "1d" });
}

// export Function
export { generateAccessToken }
