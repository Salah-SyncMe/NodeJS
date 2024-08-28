const Blog=require("../models/blog_model");
const mongoose=require("mongoose");
const User=require("../models/user_model");

exports.fetch=async(request,response)=>{
try {

    const dataBlog=await Blog.find();

   if( dataBlog.length==0){
    return response.json({
        success:true,
        message:`The blogs not found`
        
            });
   }
   else{
    return response.json({
        success:true,
        blogs:dataBlog
        
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
        const dataBlog=await Blog.findById(id);
    
       if( dataBlog.length==0){
        return response.json({
            success:true,
            message:`The blogs not found`
            
                });
       }
       else{
        return response.json({
            success:true,
            blogs:dataBlog
            
                });
                 
    
       }
        
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                });   
    }
    
    };
exports.addBlog=async(request,response)=>{
    const {user}=request.body;

    const existUser=await User.findById(user);

    try {



    if(!existUser){
        return response.status(400).json({
            success:true,
            message:`no have account.yet, go to sign up`
            
                });


    }
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                });
    }
try {


    const addBlog=new Blog(request.body);

const session=await mongoose.startSession();
session.startTransaction();
const saveBlog=await addBlog.save({session});
existUser.blog.push(addBlog);

await existUser.save({session});
await session.commitTransaction();


return response.status(200).json({success:true,body:saveBlog});
} catch (error) {

    return response.json({
success:false,
message:`${error}`

    });
    
}


};
exports.updateBlog=async(request,response)=>{
try {
    const id=request.params.id;
    // const {title}=request.body;
if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ success:false,error: 'Invalid ID format' });
}
    const updateSuccess=await Blog.findByIdAndUpdate(id,{$set:request.body},{timestamps:true});

if(updateSuccess){
    return response.json({

        success:true,
        message:`Was updated successfully`,
        blog:updateSuccess
        
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


exports.deleteBlog=async(request,response)=>{
    let blog;
    try {
        const id=request.params.id;
        
        // const {title}=request.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ success:false,error: 'Invalid ID format' });
    }

    blog=await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
        // const deleteSuccess=await Blog.findByIdAndDelete(id);
    
    if(blog){
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