const { google } = require('googleapis')
const path =require('path')
const fs = require('fs')
const { types } = require('util')
require('dotenv').config();


const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

oauth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

const drive = google.drive({
    version:'v3',
    auth:oauth2Client,
})

const filePath= path.join(__dirname,'Calendrier.pdf')

const uploadFile=async()=>{
    try{
       const response = await drive.files.create({
           requestBody:{
               name:'Calendrier.pdf',
               mimeType:'application/pdf'
           },
           media:{
               mimeType :'application/pdf',
               body:fs.createReadStream(filePath)
           }
       });
       console.log(response.data)

    }catch(err){
      console.log(err)        
    }
}

// uploadFile()

const deleteFile=async()=>{
    try{
      const response =await drive.files.delete({
        fileId:'1NktIRluykdqRXbFJu-XoL5k71JecWfeh',
      })
      
      console.log(response.data)
    }catch(err){
        console.log(err)
    }
}

// deleteFile()

const generatePublicUrl=async()=>{
   try{
    // const ID = await drive.files.generateIds('Calendrier.pdf')
   const ID = '1T0t4BJW3SQ8fUp7y5MSJ674TFhiFLrIq'
    await drive.permissions.create({
     fileId:ID,
     requestBody:{
         role:'reader',
         type:'anyone'
     }
    });

    const response =await drive.files.get({
      fileId:ID,
      fields:'webViewLink, webContentLink',
    })

    console.log(response.data)
   }catch(err){
       console.log(err)
   }

}

generatePublicUrl()