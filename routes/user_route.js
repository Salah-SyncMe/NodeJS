const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/user_controller");

userRoute.get("/",userController.fetchUsers);
userRoute.get("/:id",userController.fetchById); //ex:http://localhost:5000/user/66cdf8873c9f3d6af22d58be

userRoute.post("/signup",userController.userSignUp);
userRoute.get("/login",userController.userLogin);




module.exports=userRoute;
