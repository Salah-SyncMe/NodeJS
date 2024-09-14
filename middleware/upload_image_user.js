const path=require("path");
const multer=require("multer");

var storage=multer.diskStorage({
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