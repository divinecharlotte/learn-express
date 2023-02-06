import bcrypt from "bcrypt";
import joi from 'joi';
import User  from "../models/User.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';

// import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Compare the passwords
    const isValid = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!isValid) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Return the user if everything is okay
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const JWT_SECRET = "secret_key";

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


const signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "Wrong credintial" });
  }
  console.log(user.password);
  const userPassword = await bcrypt.compare(req.body.password, user.password);

  if (!userPassword) {
    return res.status(401).json({
      status: false,
      error: "Incorect password or email..!",
    });
  }
  const token = jwt.sign({id: user._id}, JWT_SECRET,{expiresIn:"1d"});
  return res.json({user, token});
}
      


// const signIn =  (req,res, next)=>{
//   // passport.authenticate('local', {session: false}, (error, user, info) => {
//   //   if (error || !user) {
//   //     return res.status(400).json({
//   //       message: 'Something is not right',
//   //       user   : user
//   //     });
//   //   }
//   //   req.login(user, {session: false}, (error) => {
//   //     if (error) {
//   //       res.send(error);
//   //     }
//       const token = jwt.sign({id: user._id}, JWT_SECRET);
//       return res.json({user, token});
//   //   });
//   // })(req, res, next);
// };

const get_user = async (req, res) => {
  try{
    const user = await User.find({})
    res.status(200).json(user)
  } catch(err){
    res.status(404).json(err)
  }
};

export default  {
  registerUser,
  signIn,
  get_user
}








// import bcrypt from "bcrypt";
// import joi from 'joi';
// import User  from "../models/User.js";


// const registerUser = async(req,res) => {
//   const schema = joi.object({
//     email: joi.string().email().required(),
//     password: joi.string().required(),
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

// let get_user = async (req, res) => {
		
//   try{
//       const user = await User.find({})
//       res.status(200).json(user)
//   }
//   catch(err){
//       res.status(404).json(err)
//   }
//  }
// export default  {
//     registerUser,
//     signIn,
//     get_user
// }
