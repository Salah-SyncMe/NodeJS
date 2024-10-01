const app=require("./app");
const postRoute=require("./routes/post_route");
const userRoute=require("./routes/user_route");
// Post Route
app.use("/post",postRoute);


// User Route 
app.use("/user",userRoute);


