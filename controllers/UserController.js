const Joi = require('joi');
const User = require("../models/User");

let user_creation =  async (req,res) => {
		
    const validateUser = (data) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-z]+$/).required()
        });
        return schema.validate(data);
        }
	
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);
    
    const user = new User({
        email: value.email,
        password: value.password,
    });
    console.log(req.body.password);
    await user.save();
    res.send(user);
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
module.exports = {
    user_creation,
    get_user
}