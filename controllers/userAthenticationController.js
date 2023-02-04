import bcrypt from "bcrypt";
import joi from 'joi';
import User  from "../models/User.js";




const registerUser = async(req,res) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);
    const newUser = new User({
      email: value.email,
      password: hashedPassword
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};


const signIn =  (req,res)=>{
    try {
         User.findOne({email:req.body.email}, async (error,user)=>{
            if(user){
                const validated = await bcrypt.compare(req.body.password ,user.password);
                if (validated) {
                    res.status(201).json(user)
                }else{
                    res.status(404).json("wrong credentials");
                }
            }
             
        });
        
    } catch (error) {
        res.status(404).json(error)
    }
}

let get_user = async (req, res) => {
		
  try{
      const user = await User.find({})
      res.status(200).json(user)
  }
  catch(err){
      res.status(404).json(err)
  }
 }
// export default  {}
export default  {
    registerUser,
    signIn,
    get_user
}





// const bcrypt = require("bcrypt")
// const Joi = require('joi');
// const User = require("../models/User");




// const registerUser = async(req,res) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   });

//   const { error, value } = schema.validate(req.body);

//   if (error) {
//     res.status(400).json({ error: error.details[0].message });
//     return;
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(value.password, salt);
//     const newUser = new User({
//       email: value.email,
//       password: hashedPassword
//     });
//     const user = await newUser.save();
//     res.status(201).json(user);
//   } catch (e) {
//     res.status(500).json(e);
//   }
// };


// const signIn =  (req,res)=>{
//     try {
//          User.findOne({email:req.body.email}, async (error,user)=>{
//             if(user){
//                 const validated = await bcrypt.compare(req.body.password ,user.password);
//                 if (validated) {
//                     res.status(201).json(user)
//                 }else{
//                     res.status(404).json("wrong credentials");
//                 }
//             }
             
//         });
        
//     } catch (error) {
//         res.status(404).json(error)
//     }
// }
// module.exports = {
//     registerUser,
//     signIn
// }