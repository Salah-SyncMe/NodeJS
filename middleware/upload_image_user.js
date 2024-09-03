const path=require("path");
const multer=require("multer");

var storage=multer.diskStorage({
destination: function(request,file,cb){
cb(null,"./uploads/images");


},
filename: function(request,file,cb){
let ext=path.extname(file.originalname);

cb(null,request.body.email+ext);

}
});



var upload=multer({
storage:storage
// fs
// limits:{
    
//     fieldSize : 1024 * 1024 * 2



// }
});


module.exports=upload