import { Router } from "express";
import { auth, checkIsInRole } from "../../middleware/passport.mjs";
import { deleteById, getAllUser, updateUserById } from "../controller/user.controller.mjs";
let routeUser = Router();

/**
 * Route Get All user
 */
routeUser.get('/', auth, checkIsInRole("user"), getAllUser);

/**
 * Route Delete User By Id
 */
routeUser.delete('/:id', auth, checkIsInRole("admin"), deleteById);

/**
 * Route Update User By Id
 */
routeUser.put('/:id', auth, checkIsInRole("admin"), updateUserById);

export { routeUser };