import validateBlog from "./validations/blogValidation.js";
const checkValidation = (req, res, next) => {
    const { error } = validateBlog(req.body, { abortEarly: false });
  
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    try {
      next();
    } catch (error) {
      console.log("went wrong!");
    }
  };
  
  export default checkValidation;