# Node.js + Express + MongoDB boilerplate
A boilerplate to architect Node.js, Express.js, MongoDB using clean architecture.

## Architecture Overview
We are separated this application into different folders :

###### 1. app : contains the app modules. Each module has different files
    * model : Mongoose Schema
    * dao : Data Access Object
    * ctrl : service. Intermediate layer between dao and route
    * routes : http routes
    * index : binds the routes with the express instance
    * helper : helper of the **current module**

###### 2. config : App setup
    * database : database setup
    * env : deployment concerns
    * webserver : setup the server instance (express)
    * settings.json : the app settings

###### 3. controllers : App controllers
    * init.js : initializes the app config
    * http-binder : binds routes with the express instance

###### 4. helpers : App helpers / utilities (**shared with all modules**)

###### 5. middlewares : App middlewares (jwt, etc...)

###### 6. services : External services (nodemailer, AWS, etc...)

###### 7. workers : Web Workers / Child Process - Put your "heavy" work into this folder

###### 8. server.js : starts the database / app

# Tech
- ES6+
    - Class
    - Async / Await
    - Let and Const
    - Arrow Functions
    - Template Literals
    - Default params
    - Enhanced Object Literals
- Node v7+
- Express
- Mongoose
- JSON Web Tokens
- Morgan
- helmet
- compress-images
- nodemailer




