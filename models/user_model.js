const mongoose=require("mongoose");
const userSchrma=new mongoose.Schema({
name:{
    type:String,
    required:true,
    
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    minlength:6
},
image:{
    type:String


},
posts:[{

type:mongoose.Types.ObjectId,
ref:"Post",
required:true


}]
},{timestamps:true});

module.exports=mongoose.model("user",userSchrma);
