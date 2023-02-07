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

    let getComments =   async (req, res) => {
	
        try{
            const {id}= req.params
            // const comment = await Comment.find({})
            const comment  = await Comment.find({})
            res.status(200).json(comment)
        }
        catch(err){
            res.status(404).json(err)
        }

        // Comment.findOne({Blog:id},(err,data)=>{
        //     if(data){
        //         res.status(201).json({
        //             code : 201,
        //             comment :data
        //         })
        //     }else{res.status(405).json(err)}
        // })
       }
export default {postComment, getComments}