import Comment from "../models/Comment.js"
import Blog from "../models/Blog.js"
let postComment = async (req,res) => {

const Id = req.params.id
const comment = new Comment({
    		name: req.body.name,
    		message: req.body.message,
            blogId:Id
    
           
    	});
        await comment.save()
        res.status(201).json({Comment:comment})
        const blogRelated = await Blog.findById(Id);
           blogRelated.comment.push(comment);
           await blogRelated.save()
  
    }

    
    let getComments = async (req, res) => {
        try {
            const blogId = req.params.id;
            const comments = await Comment.find({ blogId });
            const messages = comments.map(comment => comment.message);
            res.status(200).json({ messages });
        } catch (err) {
            res.status(404).json(err);
        }
    };
    

export default {postComment, getComments}