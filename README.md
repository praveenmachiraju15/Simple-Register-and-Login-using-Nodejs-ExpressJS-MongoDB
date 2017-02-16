# Simple-Register-and-Login-using-Nodejs-ExpressJS-MongoDB

The server and the GET,POST are inside app.js. The listening port is 8092.
The view engine used is ejs. The front-end files are placed inside the "views" folder.

The default route of localhost:8092/ will take the user to a welcome page with links to "User Registration" and "Login".The user registration page contains a simple form that collects users' credentials. Submitting the form will trigger the POST route in app.js.

This route will check if the user already exists in the database. If that is the case, it redirects the page to say that the user already exists in the system.
If its a unique user, it will register then credentials in a collection inside MongoDB and redirects the page to say that the user has been created and added to the system

This is the basic commit..more features are being added...
