const roleModel = require('../models/RoleModels')

const getAllusers = async(req,res)=>{

    const roles = await roleModel.find()
    res.json({
        message: "role fetched successfully",
        data:roles
      });

      
}
const AddUsers = async(req,res)=>{

  console.log(req.body)

  const saveUsers = await roleModel.create(req.body)


  res.json({
    message:"role are added",
    data:saveUsers

  })
}

const Deleteusers = async(req,res)=>{

  const deletes= await roleModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"deleted Role succsefull",
    data:deletes
  })
}

const Findusers = async (res,req)=>{
  const findbyid = await roleModel.findById(req.params.id)

  res.json({
    message:"Role find by id",
    data:findbyid
  })
}

module.exports = {getAllusers,AddUsers,Deleteusers,Findusers}