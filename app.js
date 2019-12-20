const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/',(req,res)=>{
    res.json({message : 'Welcome to api.'})
});
app.post('/api/v1/posts', verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretekey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else {
            res.json({
                message : 'Post created...',
            authData
        });
        }
    })
});
app.post('/api/v1/login',(req,res)=>{
    //Mock user
    const user ={
        id:1,
        name : 'Sumit',
        email:'sumit@balyan.com'
    };
    jwt.sign({user},'secretekey',{ expiresIn : '30s' },(err,token)=>{
        res.json({token});
    });
});
// Format Token
// Authorization : Bearer <access_token>
//Verify token
function verifyToken(req,res,next) {
    //Get Auther value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token 
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}
app.listen(5000,()=>console.log('server start on port 5000.'));