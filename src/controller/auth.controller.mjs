import { findByUserName, save, updateAccessToken } from "../repository/user.repository.mjs";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { generateAccessToken } from "../../middleware/passport.mjs";


/**
 * Login Controller
 * @param {*} req 
 * @param {*} res 
 */
async function login(req, res)
{
    const user = await findByUserName(req.body.userName);
    if (user !== null)
    {
        if (await bcrypt.compare(req.body.password, user.password))
        {
            const accessToken = generateAccessToken({ user: user.id }, "1d");
            const updateToken = await updateAccessToken({ access_token: accessToken}, user.id);
            if (updateToken.success == true)
            {
                res.json({
                    "status": 200,
                    "message": `LOGIN SUCCESS`,
                    "access_token": accessToken
                });                 
            }
            else
            {
                res.json({
                    "status": 400,
                    "message": `FAILED - BECAUSE ${updateToken.message}`
                }); 
            }
        }
        else
        {
            res.json({
                "status": 400,
                "message": `USERNAME AND PASSWORD NOT MATCH`
            }); 
        }
    }
}

/**
 * Create NEw User / Registrasi Controller
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createUser(req, res)
{
    let response = [];
    try {        
        await body('userName', 'User Name IS Required OR Cannot Be Empty/NULL').exists().run(req);
        await body('firstName', 'Minimal Length 2').isLength({ min: 2 }).run(req);
        await body('lastName').isString().run(req);
        await body('password')
            .matches(/[A-Z]/)
            .withMessage("Password Should Have at Least One Uppercase")
            .isLength({ min: 8 })
            .withMessage("your password should have min length 8")
            .matches(/\d/)
            .withMessage("your password should have at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("your password should have at least one sepcial character").run(req);
        
        
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const extractedErrors = [];
            err.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
            return res.status(422).json({
                errors: extractedErrors,
            });
        }
        const resultUser = await findByUserName(req.body.userName);
        if (resultUser !== null)
        {
            response.push({
                "status": 400,
                "message": `FAILED TO CREATE USER FOR THIS USER NAME ${req.body.userName} BECAUSE USER ALREADY EXIST`,
                "data": null
            })
            return res.json(response);
        }
    
        const password = await bcrypt.hash(req.body.password, 10);
        const request = req.body;
        const user = {
            userName: request.userName,
            firstName: request.firstName,
            lastName: request.lastName,
            password: password
        }
    
        const createUser = await save(user, res);
        if (createUser.success == true)
        {
            response.push({
                "status": 200,
                "message": `SUCCESFULLY CREATE USER FOR THIS USER NAME ${user.userName}`,
                "data": user
            });
        }
        else
        {
            response.push({
                "status": 400,
                "message": `FAILED TO CREATE USER FOR THIS USER NAME ${user.userName} BECAUSE ${createUser.message}`,
                "data": null
            }); 
        }
    }
    catch (error)
    {
        response.push({
            "status": 400,
            "message": `FAILED TO CREATE USER FOR THIS USER NAME ${user.userName} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
    res.json(response);
}

async function logout(req, res)
{
    try
    {
        const accessToken = generateAccessToken({ user: req.user.id }, "1s");
        const updateToken = await updateAccessToken({ access_token: accessToken }, req.user.id);
        if (updateToken.success == true)
        {
                res.json({
                    "status": 200,
                    "message": `LOGOUT SUCCESS`,
                    "access_token": accessToken
                });                 
            }
            else
            {
                res.json({
                    "status": 400,
                    "message": `FAILED - BECAUSE ${updateToken.message}`
                }); 
            }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED - BECAUSE ${error.message}`
        }); 
    }
}

// Export Function
export {login, createUser, logout}