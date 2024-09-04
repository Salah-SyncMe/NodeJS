const { request, response } = require("express");
const User=require("../models/user_model");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");




exports.fetchUsers=async(request,response)=>{
try {
    const allUsers=await User.find();

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
exports.fetchById=async(request,response)=>{

    try {
    const id=request.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ success:false,error: 'Invalid ID format' });
    }
        const dataUser=await User.findById(id);
    
       if( dataUser.length==0){
        return response.json({
            success:true,
            message:`The blogs not found`
            
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

exports.userSignUp=async(request,response)=>{
    try {
const {name,email,password}=request.body;
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
//         if(request.file){
//             user.image=request.file.path
// }
        await user.save();
        
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
    const ExistUser=await User.findOne({email});

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



