// import mongoose
const mongoose = require('mongoose')

//2. connection string

const connectionString = process.env.DATABASE

//3. Connection Code
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atlas connection established...");
})

.catch((error)=>{
    console.log("Mongodb atlas connection error",error);
})
    