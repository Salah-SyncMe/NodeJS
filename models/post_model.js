const mongoose=require("mongoose");


const postSchema=new mongoose.Schema({
 text:{
   type:String,


 },
 images:{

    type:Array,
 },
 user:{
   type:mongoose.Types.ObjectId,
   ref:"user",
   required:true


 }




},{timestamps:true});



module.exports=mongoose.model("Post",postSchema);