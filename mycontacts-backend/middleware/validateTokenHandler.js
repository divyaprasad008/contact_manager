const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,resp,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            if(err){
                resp.status(401).json({message:"User not authorized"});
                // throw new Error("User not authorized");
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            resp.status(401).json({message: "User is not authorized or token is missing"})
        }
    }
});
module.exports = validateToken;