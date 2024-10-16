const { request, response } = require("express");
const User=require("../models/user_model");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const cloud=require("../middleware/cloudinary_config");
const fs=require("fs");
const { console } = require("inspector");





exports.fetchUsers=async(request,response)=>{
try {
    const allUsers=await User.find();
    console.log('Route hit'); // Add this line for debugging

    if(allUsers.length==0){
        return response.json({
            success:true,
            users:"No have any users"
            
                });



    }
    else{

        return response.json({
            success:true,
            users:allUsers
            
                });

    }





    
} catch (error) {
    return response.json({
        success:false,
        message:`${error}`
        
            }); }
};
exports.addFriend=async(request,response)=>{
    try {
       
       
        const user=request.params.id;
        const {friend}=request.body;
console.log(user);
    
        const existUser=await User.findById(user);

    if(!existUser){
        return response.status(400).json({

            success:true,
            message:`no have account yet`
            
                });



    }
    else{
    
    console.log(existUser.friends);
    const existFriend = existUser.friends.find(
        (f) => f.toString() === friend
    );
        if(!existFriend){
        const session=await mongoose.startSession();
        session.startTransaction();  
        existUser.friends.push(friend);
        await existUser.save({session});
        await session.commitTransaction();
        return response.status(200).json({success:true,
            
            friend:friend});

    }
    else{
        return response.status(400).json({

            success:true,
            message:`The friend was added before`
            
                });

    }



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
        const dataUser=await User.findById(id).populate({
            path: 'friends',  // Populates the 'friends' field with User details
            populate: {
                path: 'posts',  // Populates the 'posts' field of the friends
    // Specify the model being populated
            }
        }).populate("posts");
    
       if( dataUser.length==0){
        return response.json({
            success:true,
            message:`The users not found`
            
                });
       }
       else{
        return response.json({
            success:true,
            user:dataUser
            
                });
                 
    
       }
        
    } catch (error) {
        return response.json({
            success:false,
            message:`${error}`
            
                });   
    }
    
    };

exports.fetchUserExpectMyId=async(request,response)=>{
  
        try {
            const id=request.params.id;
            console.log(id);
            if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ success:false,error: 'Invalid ID format' });
        }
            const dataUser=await User.where('_id').ne(id);
        
           if( dataUser.length==0){
            return response.json({
                success:true,
                message:`The blogs not found`
                
                    });
           }
           else{
            console.log('User query result:', dataUser);

            return response.json({
                success:true,
                user:dataUser
                
                    });
                     
        
           }
            
        } catch (error) {
            return response.json({
                success:false,
                message:`${error}`
                
                    });   
        }

        };

exports.userSignUp=async(request,response)=>{
    try {
const {name,email,password}=request.body;
const result=await cloud.uploadFile(request.file.path);

    const ExistUser=await User.findOne({email});
    if(ExistUser){
        return response.status(400).json({
            success:true,
            message:`The email was added before`
            
                });

    }
    else{
        const incryptedPass=await bcrypt.hashSync(password);
        const user=new User({
            name,email,password:incryptedPass
        
        
        });
        
        if(request.file){
            user.image=result.url;
        }
        await user.save();
        fs.unlinkSync(request.file.path);

        response.status(200).json({
        success:true,
        message:"Was added successfully",
        user:user
        
        
        });


    }
   
    } catch (error) {
        return response.status(500).json({
            success:false,
            message:`${error}`
            
                }); }
    };

exports.userLogin=async(request,response)=>{
try {
    const {email,password}=request.body;
    const ExistUser=await User.findOne({email}).populate({
        path: 'friends',  // Populates the 'friends' field with User details
        populate: {
            path: 'posts',  // Populates the 'posts' field of the friends
// Specify the model being populated
        }
    }).populate("posts");

    if(ExistUser){
const isPassCorrect=bcrypt.compareSync(password,ExistUser.password);
if(isPassCorrect){
    return response.status(200).json({
        success:true,
        message:`Was login successfully`,
        user:ExistUser
        
            });

}
else{
    return response.status(400).json({
        success:true,
        message:`The password not correct`
        
            });


}

    }
    else{
        return response.status(400).json({
            success:true,
            message:`The email not found`
            
                });


    }

    
} catch (error) {

    return response.status(500).json({
        success:false,
        message:`${error}`
        
            });
    
}


};


exports.updateUser=async(request,response)=>{
 
    try {
       
        const id=await request.params.id;
        


    if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({ success:false,error: 'Invalid ID format' });
    }
   

if(request.file){
    const result=await cloud.uploadFile(request.file.path);
request.body.image=result.url;
fs.unlinkSync(request.file.path);
}


        const updateSuccess=await User.findByIdAndUpdate(id,{$set:request.body},{timestamps:true});
    
    if(updateSuccess){
        return response.json({
    
            success:true,
            message:`Was updated successfully`,
            user:updateSuccess
            
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



