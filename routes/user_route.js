const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/user_controller");
const upload=require("../middleware/upload");

userRoute.get("/",userController.fetchUsers);
userRoute.get("/:id",userController.fetchById); //ex:http://localhost:5000/user/66cdf8873c9f3d6af22d58be

//insert an user into database route
userRoute.post("/signup",upload.single("image"),userController.userSignUp);
userRoute.post("/login",userController.userLogin);



module.exports=userRoute;
