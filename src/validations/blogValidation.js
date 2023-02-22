import Joi from "@hapi/joi";

const BlogSchema = Joi.object({
    title: Joi.string()
                .min(1)
                .max(100)
                .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/),
              content: Joi.string()
                .min(20)
                .max(100),
              image: Joi.string(),
            
});

const validateBlog = (blogData) => {
  return BlogSchema.validate(blogData, { abortEarly: false });
};

export default validateBlog;