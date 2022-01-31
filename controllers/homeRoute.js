const homeRoute = require('express').Router()
homeRoute.get('/',(req,res)=>{
  if(req.session.viewCount){
     req.session.viewCount = req.session.viewCount +1
  }else{
    req.session.viewCount = 1;
  }
  res.render('login');
})
module.exports = homeRoute;