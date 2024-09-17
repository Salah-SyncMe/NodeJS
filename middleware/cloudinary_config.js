const cloudinary=require("cloudinary");
const fs=require("fs");

cloudinary.config({ 
    cloud_name: 'ddwodk954', 
    api_key: '831469562479161', 
    api_secret: 'OXQJIqF5nN_hTSiTO1K47xr9Awo',
    secure: true, // Click 'View API Keys' above to copy your API secret
});


exports.uploads=(filePath)=>{
return new Promise(resolve=>{
cloudinary.uploader.upload(filePath,(result)=>{

resolve({
url: result.url,
id: result.public_id


})


},{resource_type:"auto"});


});

}

exports.uploadAll=async(files)=>{

return await Promise.all(files.map(async (file)=>{
    const filePath = file.path;
    return new Promise(resolve=>{
        cloudinary.uploader.upload(filePath,(result)=>{
        
        return resolve(
        result.url        
        
        )
        
        
        },{resource_type:"auto"});
        
        
        });
        
     
    }));
}
exports.uploadFile=(file)=>{
    return new Promise(resolve=>{
    cloudinary.uploader.upload(file,(result)=>{
    
    resolve({
    url: result.url,
    id: result.public_id
    
    
    })
    
    
    },{resource_type:"auto"});
    
    
    });
    
    }