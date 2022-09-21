import {Router} from "express";
import { auth} from "../../middleware/passport.mjs";
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
routeAuth.post('/logout', auth, logout);

export { routeAuth };