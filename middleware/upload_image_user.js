const path=require("path");
const multer=require("multer");

var storage=multer.diskStorage({
destination: function(request,file,cb){//callback
cb(null,path.join(__dirname,"../uploads/images"));


},

filename: function(request,file,cb){
let ext=path.extname(file.originalname);
const email= request.body.email;
const s=email.split('@');
cb(null,(s[0])+ext);

}
});




var upload=multer({
storage:storage
});


module.exports=upload;