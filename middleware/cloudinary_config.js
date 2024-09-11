const cloudinary=require("cloudinary");

cloudinary.config({ 
    cloud_name: 'ddwodk954', 
    api_key: '831469562479161', 
    api_secret: 'OXQJIqF5nN_hTSiTO1K47xr9Awo',
    secure: true, // Click 'View API Keys' above to copy your API secret
});


exports.uploads=(files)=>{
return new Promise(resolve=>{
cloudinary.uploader.upload(files,(result)=>{

resolve({
url: result.url,
id: result.public_id


})


},{resource_type:"auto"});


});

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