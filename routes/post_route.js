const express=require("express");
const postRoute=express.Router();
const postController=require("../controllers/post_controller");
const uploadPost=require("../middleware/upload_images_post");

postRoute.get("/",postController.fetch); //ex:http://localhost:5000/post
postRoute.get("/:id",postController.fetchById); //ex:http://localhost:5000/post/66cdf8873c9f3d6af22d58be

postRoute.post("/create",uploadPost.array("images"),postController.addPost);//add post
postRoute.put("/update/:id",postController.updatePost);
postRoute.delete("/delete/:id",postController.deletePost);

module.exports=postRoute;
