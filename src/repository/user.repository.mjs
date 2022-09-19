import {db} from "../../models/index.mjs";

const User = db.User;

/**
 * Query save new user
 * @param {*} user 
 * @returns 
 */
async function save(user)
{
    let result = {
        "success": false,
        "message": null,
    };

    try
    {
        await User.create(user);
        result.success = true;
    }
    catch (error)
    {
        result.message = error.message;
    }
    return result;
}

/**
 * Query Find User by userName
 * @param {*} userName 
 * @returns 
 */
async function findByUserName(userName)
{
    return await User.findOne({
        where: { userName: userName }, raw: true
    });
}

/**
 * Query Find By Id
 * @param {*} id 
 * @returns 
 */
async function findById(id)
{
    return await User.findOne({
        where: { id: id }, raw: true
    });
}

/**
 * Query Update User By Id
 * @param {*} data 
 * @param {*} id 
 */
async function updateAccessToken(data, id)
 {
     let result = {
         "success": false,
         "message": null,
     };
     try
     {
         const updateUser = await User.update(data, {
             where : {id: id}
         });
         updateUser[0] !== 0 ? result.success = true : result.success = false;
     }
     catch (error)
     {
         result.message = error.message;
     }
     return result;
}
 
/**
 * Query Find All user
 * @returns 
 */
async function findAllUser()
{
    return await User.findAll({
        raw: true,
        attributes: { exclude: ['access_token', 'refresh_token', 'password']}
    });   
}

/**
 * Query Delete user By Id
 * @param {*} id 
 * @returns 
 */
async function destroy(id)
{
    return await User.destroy({ where: {id: id} });
}

/**
 * Export Function
 */
export { save, findById, findByUserName, findAllUser, updateAccessToken, destroy };
