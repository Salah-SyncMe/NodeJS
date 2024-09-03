const express=require("express");
const app=express();
const body_parser=require("body-parser");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
app.use(body_parser.json());
app.use('/uploads', express.static('uploads'));
dotenv.config();
const port=process.env.PORT || 5001;
const mogoose_url=process.env.MONGO_URL;
mongoose.connect(mogoose_url).then(()=>{
    console.log(`was connected DB successfully`);
     
    app.listen(port,()=>{
        console.log(`Listening for server port http://localhost:${port}`);
        });




        
}).catch((e)=>{

    console.log(`Error: ${e}`);


});








module.exports=app;