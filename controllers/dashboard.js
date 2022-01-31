const dashboardRoute = require("express").Router();

dashboardRoute.get('/',(req,res)=>{
    console.log(req.user.name)
    res.render('index',{name:req.user.name})
})


dashboardRoute.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
  })

module.exports = dashboardRoute;