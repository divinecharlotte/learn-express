const Joi = require('joi');
const User = require("../models/User");


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
    get_user
}