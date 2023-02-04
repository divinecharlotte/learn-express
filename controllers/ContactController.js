const Contact = require("../models/Contact");
const Joi = require('joi');


const validateContact = (data) => {
    const schema = Joi.object({
        name: Joi.string().regex(/^[a-zA-Z]+ [a-zA-Z]+$/).required(),
        email: Joi.string().email().required(),
        message: Joi.string().min(20).max(100).required()
    });
    return schema.validate(data);
    }
let post_contact = async (req,res) => {
	const { error, value } = validateContact(req.body);
	if (error) return res.status(400).send(error.message);
	
	const contact = new Contact({
		name: value.name,
		email: value.email,
		message: value.message,
	});
	
	await contact.save();
	res.send(contact);
}

let get_contact =  async (req, res) => {
	
	try{
		const contact = await Contact.find({})
		res.status(200).json(contact)
	}
	catch(err){
		res.status(404).json(err)
	}
   }

module.exports = {
   post_contact,
   get_contact
}