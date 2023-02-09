import Like from "../models/Like.js"
import Blog  from "../models/Blog.js"
let postLike = async (req,res) => {
// try{

// const like = new Like({
//     	});
        
//     await like.save()
//     res.status(201).json({Like:like,blogId: req.params.id})

//   }catch (error){
//     res.status(500).json({error:error.message})
//     console.log(error.message);
//   }}
const Id = req.params.id
const like = new Like({
    		
            blogId:Id
            // 
           
    	});
        await like.save()
        res.status(201).json({Like:like})
        const blogRelated = await Blog.findById(Id);
           blogRelated.like.push(like);
           await blogRelated.save()}


        //    const likeCounter = async (req, res) => {
        //     try {
        //       const blog = await Blog.findOne({ _id: req.params.id }).select(
        //         "BlogTitle likes"
        //       );
          
        //       if (!blog)
        //         return res.status(204).json({ message: "Can't find blog with given Id" });
          
        //       return res.status(200).json({ blog: blog });
        //     } catch (error) {
        //       res.status(500).json({ error: "something Went wrong...!" });
        //     }
        //   };
          
export default postLike