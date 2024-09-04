const path=require("path");
const multer=require("multer");

var storage=multer.diskStorage({
destination: function(request,file,cb){
cb(null,"../uploads/images/");


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
// limits:{
    
//     fieldSize : 1024 * 1024 * 2



// }
});


module.exports=upload