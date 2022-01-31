const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
dotenv.config({path:'./config/config.env'});
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const connectDb = require('./controllers/database');
connectDb();
//passport local 
require('./config/localStrategy')(passport)
//const connection = mongoose.createConnection(dbString,options)
const path = require('path')
const port = process.env.PORT || 7776;
const homepage = require('./controllers/homeRoute');
const loginRoute = require('./controllers/login');
const registerRoute = require('./controllers/register');
const dashboardRoute = require('./controllers/dashboard');
const authorized = require('./config/auth');
app.use(express.static(path.join(__dirname,'views/public/statics')))
app.use(morgan('dev'));

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true}
    }),
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}))

//passsport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// create global var
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg')
  res.locals.err_msg = req.flash('err_msg');
  res.locals.error = req.flash('error')

  next()
})

// Get the homepage
app.use(homepage);
//Login Logic
app.use('/login', loginRoute)
//Register Logc
app.use('/register', registerRoute)
//Dashboard Route
app.use('/dashboard',authorized.ensureAuthenticated,dashboardRoute)

app.listen(port,()=>{
    console.log(`Listening on port: ${process.env.PORT}`)
})