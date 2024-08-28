const app=require("./app");
const blogRoute=require("./routes/blog_route");
const userRoute=require("./routes/user_route");

// Blog Route
app.use("/blog",blogRoute);


// User Route 
app.use("/user",userRoute);


