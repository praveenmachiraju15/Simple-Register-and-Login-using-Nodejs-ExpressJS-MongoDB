/**
 * Created by vedapraveen on 2/14/2017.
 */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var path = require('path') //for body paths, this is a core npm module
var expressValidator = require('express-validator') //for page validation module -  the express-validator
var mongojs = require('mongojs')
var db = mongojs('customerapp', ['users'])

//the following lines are bodyParser middleware... dont need to know in detail
app.use(bodyParser.json());//this makes parsing JSON possible
app.use(bodyParser.urlencoded({extended: false}));

//now setting a static path to use thoughout the project
app.use(express.static(path.join(__dirname, 'public')))

//Global vars
app.use(function(req,res,next){
    res.locals.errors = null;
    res.locals.userStatus= null;
    next()
})


//express validator middleware as copied from GitHub
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


//setting the view engine
app.set('view engine','ejs') //setting the view engine as 'ejs'
app.set('views',path.join(__dirname,'views'))//view paths will be taken from '__dirname/views'

app.get('/',function(req,res){
    res.render('homepage');
})


app.get('/AddUser',function(req,res){
    res.render('index');
})

app.get('/Login',function(req,res){
    res.render('loginpage');
})

app.post('/Login',function(req,res,next){
    res.send("Im in the login route")
    authenticate(req,res)
})

function authenticate(req,res){
    console.log("Im in the function")

    username  = req.body.username;
    password = req.body.password;

//    console.log("The username:  " + username)
}
//app.use(authenticate())





app.get('/ShowUsers',function(req,res){
    db.users.find(function (err, docs) {
        console.log(docs)
        res.render('showUsersFromDB',{
            title: 'Users From DB',
            users: docs
        })
    })
    //this will be fetched from the 'views' folder
})
app.post('/users/add',function(req,res){
    //console.log(req.body.firstname)
    req.checkBody('firstname','First Name is Required').notEmpty(); //makes sure the input is not Empty
    req.checkBody('lastname','Last Name is Required').notEmpty(); //makes sure the input is not Empty
    req.checkBody('email','email is Required').notEmpty(); //makes sure the input is not Empty

    var errors = req.validationErrors(); //if any errors, the will be set to the 'errors' variable
    if(errors){
        console.log("errors")
        res.render('index',{
            errors: errors
        })
    } else {
        var newUser = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            username: req.body.username,
            password: req.body.password,
            password2 : req.body.repassword
        }
        console.log(newUser)
        db.users.findOne({$or: [{email: newUser.email},{username: newUser.username}]},function(err,result){
            if(result){
                console.log("User Already Exists")
                res.render('userStatusPage',{userStatus : "User Already Exists"})
            } else {
                console.log("Writing the user to DB")
                db.users.insert(newUser,function(err,result){
                    if(err) {console.log("Error Writing")}
                    else {
                        console.log("User created" + result)
                        res.render('userStatusPage', {
                            userStatus : "New User Added to DB"
                        })
                    }
                })
            }
        })
        console.log("SUCCESS")
    }
})

app.get('/userStatusPage',function(req,res){
    res.render('userStatusPage')
})

app.listen(8092,function(){
    console.log("Listening on 8092")
})