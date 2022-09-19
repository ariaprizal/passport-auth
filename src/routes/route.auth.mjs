import {Router} from "express";
import { createUser, login } from "../controller/auth.controller.mjs";
let routeAuth = Router();

/**
 * Route Create New User / Registrasi New User
 */
routeAuth.post('/registrasi', createUser);


/**
 * Route Login 
 */
routeAuth.post('/login', login);

export { routeAuth };