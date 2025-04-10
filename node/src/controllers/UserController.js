const userModel = require('../models/UserModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 const JWT_SECRET= "jwtsecret"
 const sendMail = require('../utiles/sendmail')
const getAllusers = async(req,res)=>{

    const users = await userModel.find()
 
    res.json({
        message: "users fetched successfully",
        data:users
      });
}
const AddUsers = async(req,res)=>{

  try {
   const salt= bcrypt.genSaltSync(10)
   const hashPassword = bcrypt.hashSync(req.body.password,salt)
   req.body.password = hashPassword
 
   const saveUsers = await userModel.create(req.body)

   const token = jwt.sign({id:saveUsers._id},JWT_SECRET,{expiresIn:'4h'})
    res.status(201).json({
     message:"user are added",
     data:saveUsers,
     token:token
     })
  } catch (error) {
   console.log(error)
   res.status(500).json({
     message:"error"
  })
   }  
 } 
const loginUsers = async(req,res)=>{
const {email,password}= req.body
 const foundUsers = await userModel.findOne({email})
  if(foundUsers != null){
    const isMatch = bcrypt.compareSync(password,foundUsers.password)
    const token = jwt.sign({id:foundUsers._id},JWT_SECRET,{expiresIn:'4h'})
    if(isMatch){
      res.status(200).json({
        message:'login success',
        data:foundUsers,
        token:token
      })
    }
    else{
      res.status(404).json({
        message:'invalid password'
      })
    }
  }else{
    res.status(404).json({
      message:'user not found'
  })}

}
const Deleteusers = async(req,res)=>{

  const deletes= await userModel.findByIdAndDelete(req.params.id)

  res.json({
    message:"deleted users succsefull",
    data:deletes
  })
}
const Findusers = async (req, res) => {
  try {
    console.log(req.params.id);
    const userId = req.params.id; // Use ID from URL or decoded JWT

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId)// Fetch only necessary fields

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User found successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotpassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), JWT_SECRET,{expiresIn:'1h'});
    
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <h1>Reset Password</h1>
                          <p>Click the link below to reset your password</p>
                          <a href ="${url}" >rest password</a>
                          </html>`;
    //email...
    await sendMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, JWT_SECRET);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};


module.exports ={getAllusers,AddUsers,Deleteusers,Findusers,loginUsers,forgotpassword,resetpassword}