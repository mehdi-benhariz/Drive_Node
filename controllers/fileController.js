const index =require('../index')

exports.createFile=(req,res,next)=>{
    try {
        res.send(req.file);
        const {fieldname,filename,path,mimetype} = req.file;
        console.log(fieldname,filename,path)
        const data = index.uploadFile(path,filename,mimetype)
        
      }catch(err) {
console.log(err);
      }
}

exports.deleteFile=(req,res,next)=>{
  try{
    
  }
  catch(err){

  }
}

exports.updateFile=(req,res,next)=>{

}