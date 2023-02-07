import Comment from "../models/Comment.js"
import Blog from "../models/Blog.js"
let postComment = async (req,res) => {
// try{
    // const userId = req.user._id
    // console.log(userId);
const Id = req.params.id
const comment = new Comment({
    		name: req.body.name,
    		message: req.body.message,
            blogId:Id
            // 
           
    	});
        await comment.save()
        res.status(201).json({Comment:comment})
        const blogRelated = await Blog.findById(Id);
           blogRelated.comment.push(comment);
           await blogRelated.save()
  

//   }catch (error){
//     // res.status(500).json({error:error.message})
//     // console.log(error.message);
//   }}
    }

export default postComment