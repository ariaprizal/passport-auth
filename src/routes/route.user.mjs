import { Router } from "express";
import passport from 'passport';
import { checkIsInRole, checkIsInToken } from "../../middleware/passport.mjs";
import { deleteById, getAllUser, updateUserById } from "../controller/user.controller.mjs";
let routeUser = Router();

/**
 * Route Get All user
 */
routeUser.get('/', passport.authenticate('jwt', { session: false}), checkIsInRole("user"), checkIsInToken(), getAllUser);

/**
 * Route Delete User By Id
 */
routeUser.delete('/:id', passport.authenticate('jwt', { session: false }), checkIsInRole("admin"), checkIsInToken(), deleteById);

/**
 * Route Update User By Id
 */
routeUser.put('/:id', passport.authenticate('jwt', { session: false }), checkIsInRole("admin"), checkIsInToken(), updateUserById);

export { routeUser };