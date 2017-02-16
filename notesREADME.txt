Notes taken while following the tutorial form YouTube:
----------------------------------------------------------

1) Middleware is just functions that we want to fire-up from with in our .js files

we can create middleware functions by making a callback function with a parameter as 'next'; here is an examaple

var logger = function(req,res,next){

    console.log("Logging...");
    next();
}

app.us(logger) // this will fire it up, [in other words, its gonna call the function...]

app.use(express.static(path.join(__dirname, 'public')))
    This a module from the path import, this makes it possible to make a static directory to be used through out the project

   --------------------------------------
   Parsing JSON

   var people=[{
      Name: "Praveen Machiraju",
       age:22
   },
       {
           Name: "Ahmed Ahmed",
           age: 22
       }
   ]

   app.get('/',function(req,res){
       res.json(people)
   })

   instead of res.send(), we can do res.json(<objName>) and it will send the page the JSON object that is being referred to

   -----------------------------------------
   Setting the View Engine and the path for it:

   app.set('view engine','ejs') //setting the view engine as 'ejs' -- Probably change the second parameter for different engine (jade..etc)
   app.set('views',path.join(__dirname,'views'))//view paths will be taken from '__dirname/views'

   and instead of app.send(), we do app.render()



---------------------------------------------------------------------------------------------------
|INORDER TO MAKE SOMETHING GLOBAL DO THE FOLLOWING:                                                |
|                                                                                                  |
| app.use(function(req,res,next){                                                                  |
|                                                                                                  |
| res.locals.<variablename> = null //init to null be default                                       |
| next();                                                                                          |
| });                                                                                              |
---------------------------------------------------------------------------------------------------|

OR logic for authentication in MongoDB:
db.users.findOne({$or:[ {firstname:newUser.firstname},{lastname: newUser.lastname},{email: newUser.email}]}

page redirection (setTimeout(function(){window.location.href='form2.html'},5000);)