const Post=require("../models/post_model");
const mongoose=require("mongoose");
const User=require("../models/user_model");
const cloud=require("../middleware/cloudinary_config");
const fs=require("fs");
exports.fetch=async(request,response)=>{
try {

    const dataPost=await Post.find();

   if( dataPost.length==0){
    return response.json({
        success:true,
        message:`The posts not found`
        
            });
   }
   else{
    return response.json({
        success:true,
        posts:dataPost
        
            });
             

   }
    
} catch (error) {
    return response.json({
        success:false,
        message:`${error}`
        
            });
             
}
   

};
exports.fetchById=async(request,response)=>{

    try {
    const id=request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ success:false,error: 'Invalid ID format' });
    }
        const dataPost=await Post.findById(id);
    
       if( dataPost.length==0){
        return response.json({
            success:true,
            message:`The posts not found`
            
                });
       }
       else{
        return response.json({
            success:true,
            Posts:dataPost
            
                });
                 
    
       }
        
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                });   
    }
    
    };
exports.addPost=async(request,response)=>{



    try {

        const {user}=request.body;

        console.log(request.body);
    
        const existUser=await User.findById(user);

    if(!existUser){
        return response.status(400).json({

            success:true,
            message:`no have account.yet, go to sign up`
            
                });



    }
    else{

        const addPost=new Post(request.body);
        if(request.files && request.files.length > 0){
            const result=await cloud.uploads(request.files[0].path);

             addPost.images=result.url;
            await fs.unlinkSync(request.files[0].path);
    }
    const session=await mongoose.startSession();
    session.startTransaction();
    const savePost=await addPost.save({session});
    existUser.posts.push(addPost);
    
    await existUser.save({session});
    await session.commitTransaction();
    return response.status(200).json({success:true,post:savePost});


    }
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                });
    }




};

exports.addimage=async(request,response)=>{
    

    try {

        const {user}=request.body;
        console.log(user);
    

  
    } catch (error) {
        return response.json({
            success:true,
            message:`${error}`
            
                });
    }
try {


    const addPost=new Post(request.body);
    request.body.user=addPost._id;
    console.log(request.body);
    if(request.file){
         addPost.images=request.file.path
         request.body.user=addPost._id;
}



const session=await mongoose.startSession();
session.startTransaction();
const savePost=await addPost.save({session});
existUser.posts.push(addPost);

await existUser.save({session});
await session.commitTransaction();
// next();
return response.status(200).json({success:true,body:savePost});
} catch (error) {

    return response.json({
success:false,
message:`${error}`

    });
    
}


};

exports.updatePost=async(request,response)=>{
try {
    const id=request.params.id;
    // const {title}=request.body;
if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ success:false,error: 'Invalid ID format' });
}
    const updateSuccess=await Post.findByIdAndUpdate(id,{$set:request.body},{timestamps:true});

if(updateSuccess){
    return response.json({

        success:true,
        message:`Was updated successfully`,
        post:updateSuccess
        
            });
   }


else{

    return response.json({
        success:false,
        message:`Error: Was not updated`
     
            });

}



    
} catch (error) {
    return response.json({
        success:false,
        message:`${error}`
        
            }); 
}


};






exports.deletePost=async(request,response)=>{
    let post;
    try {
        const id=request.params.id;
        
        // const {title}=request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ success:false,error: 'Invalid ID format' });
    }

    post=await Post.findByIdAndDelete(id).populate("user");
    await Post.user.posts.pull(post);
    await Post.user.save();
        // const deleteSuccess=await Post.findByIdAndDelete(id);
    
    if(post){
        return response.json({
    
            success:true,
            message:`Was Deleted successfully`            
                });
       }

    
    else{
    
        return response.json({
            success:false,
            message:`Error: Was not deleted`
         
                });
    
    }
    
    
    
        
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                }); 
    }
    
    
    };