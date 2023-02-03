// // const { required } = require("joi");
// const Joi = require("joi");

// exports.person = Joi.object()
//   .keys({
//     name: Joi.string()
//       .min(3)
//       .max(40)
//       .required(),
//     email:  Joi.string().min(3).required().email(),
//       message: Joi.string().regex(/^[a-zA-Z ]+$/).trim().required()
//   });

// // Now create an API like so, after importing both files.
// const validation = require('./validation')
// const {
//   validate
// } = require('./validationMiddleware')

// app.post("/contacts", validate(validation.person), (req, res) => {
//   res.send("request processed");
// });

