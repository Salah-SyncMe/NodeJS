const path=require("path");
const multer=require("multer");

var storagePost=multer.diskStorage({
destination: function(request,file,cb){//callback

cb(null,path.join(__dirname,'../uploads/imagesPosts'));

},



filename: function(request,file,cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
let ext=path.extname(file.originalname);
const {user}=request.body;
cb(null,(user + '-' + uniqueSuffix)+ext);

}
});




var uploadPost=multer({
storage:storagePost
});


module.exports=uploadPost;