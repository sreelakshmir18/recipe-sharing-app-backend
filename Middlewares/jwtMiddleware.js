const jwt = require('jsonwebtoken')
//Token Verification

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware");
    
    try{
        // Get the Token
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    //verify the token
    const jwtVerification = jwt.verify(token,"recipe24")
    console.log(jwtVerification); // payload- userId
    req.payload = jwtVerification.userId

    next()
    }
    catch(err){
        res.status(401).json({"AuthorizationError":err.message})
    }
}

module.exports = jwtMiddleware
