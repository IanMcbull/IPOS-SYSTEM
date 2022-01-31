module.exports = {
    ensureAuthenticated: function(req,res,next){
     if(req.isAuthenticated()){
         return next()
     }
     req.flash('err_msg','Please log in to view your dashboard')
     res.redirect('/');
    }
}