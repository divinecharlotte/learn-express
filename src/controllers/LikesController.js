import Like from "../models/Like.js"
import Blog  from "../models/Blog.js"


let postLike = async (req, res) => {
    const blogId = req.params.id;
    const like = new Like({
        blogId,
    });
    await like.save();
    res.status(201).json({ Like: like, message: "like added" });
    const blogRelated = await Blog.findById(blogId);
    blogRelated.like.push(like);
    await blogRelated.save();
};

let countLikes = async (req, res) => {
    try {
        const blogId = req.params.id;
        const likes = await Like.find({ blogId });
        res.status(200).json({ count: likes.length });
    } catch (err) {
        res.status(404).json(err);
    }
};

export default { 
        postLike,
        countLikes };
