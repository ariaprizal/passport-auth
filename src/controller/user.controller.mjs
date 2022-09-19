import { destroy, findAllUser, update } from "../repository/user.repository.mjs";


/**
 * Get All User Controller
 * @param {*} req 
 * @param {*} res 
 */
async function getAllUser(req, res)
{
    try {
        const resultuser = await findAllUser();
        if (resultuser !== null)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY GET ALL USER`,
                "data": resultuser
            });  
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED GET ALL USER BECAUSE USER EMPTY`,
                "data": null
            });    
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED GET ALL USER BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

/**
 * Delete user By Id Controller
 * @param {*} req 
 * @param {*} res 
 */
async function deleteById(req, res)
{
    const id = req.params.id;
    try
    {
        const resultDelete = await destroy(id);
        if (resultDelete !== 0)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY DELETE DATA THIS ID ${id}`,
                "data": null
            }); 
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED DELETE DATA THIS ID ${id}`,
                "data": null
            }); 
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED DELETE DATA THIS ID ${id} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}

async function updateUserById(req, res)
{
    const id = req.params.id;
    try
    {
        const updateUser = await update(req.body, id);
        if (updateUser !== null)
        {
            res.json({
                "status": 200,
                "message": `SUCCESFULLY UPDATE THIS USER ID ${id}`,
                "data": req.body
            });  
        }
        else
        {
            res.json({
                "status": 400,
                "message": `FAILED UPDATE THIS USER ID ${id}`,
                "data": null
            });    
        }
    }
    catch (error)
    {
        res.json({
            "status": 400,
            "message": `FAILED UPDATE THIS USER ID ${id} BECAUSE ${error.message}`,
            "data": null
        }); 
    }
}


/** export Function */
export { getAllUser, deleteById, updateUserById };