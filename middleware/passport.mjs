import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { findById } from '../src/repository/user.repository.mjs';
import jwt from "jsonwebtoken";


// Validate Token
const JWTStrategy   = Strategy;
const ExtractJWT = ExtractJwt;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.AUTH_SECRET_KEY
},
async function (jwtPayload, done) {
  try {
    const user = await findById(jwtPayload.user);
    return done(null, user);
  }
  catch (err) {
    return done(err);
  }
}
));

/**
 * Cek Role user
 * @param {*} roles 
 * @returns 
 */
const checkIsInRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.json({"message" : "USER NOT FOUND FROM THE MIDDLEWARE"})
  }

  if (roles === req.user.role) {
    return next()    
  }
  else
  {
    res.json({
      "status": 400,
      "message": `YOU DONT HAVE PRIVILAGE TO ACCESS`,
      "data": null
  }); 
  }

}

/**
 * Cek Role user
 * @param {*} roles 
 * @returns 
 */
const checkIsInToken = () => (req, res, next) => {
  let token = req.headers.authorization;
  if (!req.user) {
    return res.json({"message" : "USER NOT FOUND FROM THE MIDDLEWARE"})
  }
  if (token.replace('Bearer ', '') === req.user.access_token) {
    return next()    
  }
  else
  {
    res.json({
      "status": 400,
      "message": `UNAUTHORIZED OR EXPIRED TOKEN`,
      "data": null
  }); 
  }

}


/**
 * Gneerate Token When Login
 * @param {*} user 
 * @returns 
 */
function generateAccessToken(user, expiresIn)
{
    return jwt.sign(user, process.env.AUTH_SECRET_KEY, { expiresIn: expiresIn });
}



// export Function
export { generateAccessToken, checkIsInRole, checkIsInToken }
