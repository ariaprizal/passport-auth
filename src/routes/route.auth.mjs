import {Router} from "express";
import passport from "passport";
import { checkIsInRole, checkIsInToken } from "../../middleware/passport.mjs";
import { createUser, login, logout } from "../controller/auth.controller.mjs";
let routeAuth = Router();

/**
 * Route Create New User / Registrasi New User
 */
routeAuth.post('/registrasi', createUser);


/**
 * Route Login 
 */
routeAuth.post('/login', login);

/**
 * Route Logout 
 */
routeAuth.post('/logout', passport.authenticate('jwt', { session: false }), logout);

export { routeAuth };