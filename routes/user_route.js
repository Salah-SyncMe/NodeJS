const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/user_controller");
const upload=require("../middleware/upload_image_user");
const User=require("../models/user_model");
async function updateUsersWithDefaultValues() {
    await User.updateMany({}); // Set age to 0 for all users
}
updateUsersWithDefaultValues().then(() => {
    console.log("Updated all users");
});

userRoute.get("/",userController.fetchUsers);
userRoute.get("/:id",userController.fetchById); //ex:http://localhost:5000/user/66cdf8873c9f3d6af22d58be
userRoute.get("/expect/:id",userController.fetchUserExpectMyId); //ex:http://localhost:5000/user/66cdf8873c9f3d6af22d58be
//insert an user into database route
userRoute.post("/signup",upload.single("image"),userController.userSignUp);
userRoute.post("/login",userController.userLogin);
userRoute.post("/addfriend/:id",userController.addFriend);

userRoute.put("/update/:id",upload.single("image"),userController.updateUser);



module.exports=userRoute;
