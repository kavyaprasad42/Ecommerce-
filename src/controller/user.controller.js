var User = require('../model/user.model');
const jwt=require('jsonwebtoken');
const express = require('express');


module.exports.create =async(req,res,next)=>
{
  const {username,password} = req.body;
  console.log(req.body)
  try{
    let flag = await User.find({username:username});
    console.log("FLAG IS" + JSON.stringify(flag))
    if (flag.length !==0){
      res.send("username already exist")
    }
    let user = new User({username,password});
    console.log("user is created" + JSON.stringify(user))
    user = await user.save();
    if (user) {
      res.redirect('/login')
    }else {
      res.send('user is not saved')
    }
  }
  catch (error)
  {
    res.send(error)
  }
}
module.exports.showAddUser = (req,res) =>
{
  res.render('register')
}
module.exports.showLogin = (req,res) =>
{
  res.render('login')
}
const accessTokenSecret = 'jwttokenauthentication'
module.exports.login = async(req,res) => {
  console.log(req.body.username);
  console.log("Request body is " + JSON.stringify(req.body));
  try{
    let user = await User.findOne({
    "username" : req.body.username
    })
    console.log("User is " + JSON.stringify(user));
    if(!user){
      return res.status('401').json({error:"User not found"})
}
    if(!user.authenticate(req.body.password)){
      return res.status('401').send({
        error:"username and password don't match"
      })
     }
      const token=jwt.sign({
        _id:user._id,
        role:user.role
      },accessTokenSecret)
      let {role} = await User.findOne({
        "username" : req.body.username
        })
        if(role === "admin")
        res.redirect("/get")
        else{

            res.send(token)
        }
        
      
     console.log(
        token
      )
    }
  catch(error){
    res.send(error)
}
}


module.exports.showSecureRoute = (req,res,next) => {
  res.send("Added to cart")
}
module.exports.verifyToken = (req,res,next) => {
  console.log("In verifyToken " + JSON.stringify(req.headers));
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(!bearerHeader) return res.status(401).json('Unauthorized user')
  //check if bearer is undefined
  try{
      //split at the space
      const bearer = bearerHeader.split(' ');
      //get the token from array
      const token = bearer[1];
      //set the token
      const decoded = jwt.verify(token,'jwttokenauthentication');
      console.log('Decoded',decoded);
      next()
  }catch(error){
      //Forbidden
      res.sendStatus(403);
  }
}

