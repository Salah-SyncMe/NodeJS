const express=require("express");
const blogRoute=express.Router();
const blogController=require("../controllers/blog_controller");

blogRoute.get("/",blogController.fetch); //ex:http://localhost:5000/blog
blogRoute.get("/:id",blogController.fetchById); //ex:http://localhost:5000/blog/66cdf8873c9f3d6af22d58be

blogRoute.post("/create",blogController.addBlog);//add blog
blogRoute.put("/update/:id",blogController.updateBlog);
blogRoute.delete("/delete/:id",blogController.deleteBlog);

module.exports=blogRoute;
