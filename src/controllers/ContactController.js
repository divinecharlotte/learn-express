import Contact from "../models/Contact.js";
import joi from 'joi';


const validateContact = (data) => {
    const schema = joi.object({
        name: joi.string().regex(/^[a-zA-Z]+ [a-zA-Z]+$/).required(),
        email: joi.string().email().required(),
        message: joi.string().min(20).max(100).required()
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

   let deleteContact= async (req, res) => {
    try {
    await Contact.deleteOne({ _id: req.params.id })
    res.send({ message: "the contact is successfully deleted" })
    } catch {
    res.status(404)
    res.send({ error: "contact doesn't exist!" })
    }
    }

export default {
   post_contact,
   get_contact,
   deleteContact
}