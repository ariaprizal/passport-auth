import { Router } from "express";
import { deleteById, getAllUser } from "../controller/user.controller.mjs";
let routeUser = Router();

/**
 * Route Get All user
 */
routeUser.get('/', getAllUser);

/**
 * Route Delete User By Is
 */
routeUser.delete('/:id', deleteById);

export { routeUser };