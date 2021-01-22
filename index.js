const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { google } = require('googleapis')
const path =require('path')
const fs = require('fs')
const { types } = require('util')
require('dotenv').config();
const fileRoute =require('./routes/fileRoute')

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/file',fileRoute );
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use('/images', express.static(path.join(__dirname, 'images')));
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

exports.uploadFile=async(url,title,type)=>{
    try{
       const response = await drive.files.create({
           requestBody:{
               name:title,
               mimeType:`${type}`
           },
           media:{
               mimeType :type,
               body:fs.createReadStream(url)
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

// generatePublicUrl()