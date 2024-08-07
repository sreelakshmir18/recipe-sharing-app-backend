//1.Loads .env file contents into process.env by default
require('dotenv').config()

//2.  import express
const express = require('express')

//3.  import cors
const cors = require('cors')

// 7. import DB
const db = require('./DB/connection')

//8. import router
const router = require('./Routes/router')


//4. create application using express
const rsServer = express()

//5. use express and cors
rsServer.use(cors())
rsServer.use(express.json()) //middleware

//9.

rsServer.use(router)

//Used to export images from backend
rsServer.use('/uploads',express.static('./uploads'))

//6. port creation
const PORT =4000 || process.env.PORT

rsServer.listen(PORT,()=>{
    console.log('rsServer listening on port' +PORT);
})

rsServer.get('/',(req,res)=>{
    res.send("Recipe sharing App")
})