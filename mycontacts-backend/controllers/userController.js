const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//@desc Register a user
//@route POST /user/register
//@access public
const registerUser = asyncHandler(async(req,resp)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        resp.status(404);
        throw new Error("All Fields Required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        resp.status(400);
        throw new Error("User Already Register");
    }

        //Hash PAssword
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(`Hashed Password: ${hashedPassword}`);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(`user Created ${user}`);
    if(user){
        resp.status(201).json({_id:user.id, email:user.email})
    }else{
        resp.status(400);
        throw new Error("User data is not valid");
    }
    resp.json({message:"Register User"});

});

// @desc Login a UserActivation
// @route POST /user/login
// @access public
const loginUser = asyncHandler(async(req,resp)=>{
    const {email,password} = req.body;
    if(!email || !password){
        resp.status(400).json({message:"All fields are mandatory"});;
        // throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    // compare password with hashed password
    const bcompare = await bcrypt.compare(password,user.password);
    if(user && bcompare){

        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        
        )
        resp.status(200).json({ accessToken});
    }
    else{
        resp.status(401).json({message:"Password not valid"});
        // throw new Error("Password is not valid")
    }
});

// @desc Current User
// @route GET /uset/current
// @access private
const current = asyncHandler(async(req,resp)=>{
    resp.json(req.user);
})

module.exports = {registerUser,loginUser,current};