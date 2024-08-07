//1. import userSchema or model
const users= require('../Models/userSchema')

const jwt = require('jsonwebtoken')



//Register Logic
exports.register = async(req,res)=>{
    console.log("Inside register method")
    //1.accept data from client
    const {username,email,password} = req.body
    console.log(username,email,password);

    try{
        //check if the email is already registered
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("user already registerd")
        }
        else{
            const newUser = new users({
                isAdmin:"",
                username,
                email,
                password,
                youtube:"",
                profile:"",
                status:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Login logic
exports.login = async(req,res)=>{

    //1.accept data from client
    const {email,password} = req.body

    try{
         //2. admin credentials
            const adminEmail = 'admin@gmail.com';
            const adminPassword = '123';  

        //check if the email and password in db
        const existingUser = await users.findOne({email,password});

        if(existingUser){

           let isAdmin = false;

            // check if the login is for Admin
            if(email=== adminEmail && password === adminPassword){
                isAdmin = true;
            }

            const token = jwt.sign({userId:existingUser._id,isAdmin},"recipe24");
            console.log(token);

            if(isAdmin)
                {
                    res.status(200).json({ message: "Admin login Successful", user: existingUser,token,isAdmin});
                }
                else{
                    res.status(200).json({ message: "User login Successful", user: existingUser,token,isAdmin});
                }  
        }
        else{
            res.status(404).json("Invalid email or password")
        }
        
    }
    catch(err){
            res.status(500).json('Login failed...'+err.message)
    }
}


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await users.find({});

    // Send the users in the response
    res.status(200).json(allUsers);
  } catch (error) {
    // Log the error (consider using a proper logging library)
    console.error('Error fetching users:', error);

    // Send a detailed error response
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
  // Update user status
//   exports.updateUserStatus = async (req, res) => {
//     const { uid } = req.params;
//     const { value } = req.body; // status should be 'approved' or 'rejected'
//     try {
//       const userstatus = await users.findByIdAndUpdate(_id=uid);
//       userstatus.status = value
//       res.json(userstatus);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
exports.updateUserStatus = async (req, res) => {
    const { uid } = req.params;
    const { status } = req.body; // status should be 'approved' or 'rejected'
    console.log(status);
    try {
      // Find the user by id and update the status
      const userstatus = await users.findByIdAndUpdate(
        uid, 
        { status: status }, 
        { new: true } // This option ensures that the updated document is returned
      );
      
      if (!userstatus) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(userstatus);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

