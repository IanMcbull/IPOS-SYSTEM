//const UserLocal = require('../models/userlocal');
const loginRoute = require('express').Router()
const passport = require('passport')
loginRoute.post('/',(req,res,next)=>{
    const { email,password} = req.body;
    passport.authenticate('local',{
       successRedirect: '/dashboard',
       failureRedirect:'/',
       failureFlash: true
    })(req,res,next)
 })


 module.exports = loginRoute