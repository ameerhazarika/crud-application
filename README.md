I have used a babel webpack starter pack by Brad Traversy.
You can clone the github repo from the link below and also find out more in the Readme.MD file there

https://github.com/bradtraversy/babel_webpack_starter

Before installing, please follow the procedure below so that you don't get any errors during npm run build.

The problem is that the package.json file has some configuration directives that are no longer supported in newer versions of babel.



I solved the same error like this:

1) Install babel-upgrade then run it (from within the project's directory):

npm install babel-upgrade -g

babel-upgrade --write

This will adjust the package.json file in Brad's files to remove the directives no longer supported. There is a library called babel/preset-stage-0 (which is the one no longer supported) that will be removed from the configurations in package.json.



2) Remove the package-lock.json file. Yes, delete it.



3) Run again npm install.

This will remove the actual files of the unsupported babel/preset-stage-0 library and will recreate package-lock.json



4) Finally, open webpack.config.js and remove the string that goes like: '@babel/preset-stage-0'

So that whole line should read:  presets: ['@babel/preset-env']



5) Ok, now you can run npm run build.

------------------------------------------------------------------------------------------------------------------------------
## Custom Library :
For this project, I have made my own custom HTTP Library in order to simplify the code and have included it
in the file 'http.js'
------------------------------------------------------------------------------------------------------------------------------
## Fake Rest API:
I have also used the json-server api in order to mimic the backend part of the app.

You can find its documentation in this link : https://www.npmjs.com/package/json-server

You can install it by using the command : npm install json-server --save (in the app directory)


After this, add the "json:server": "json-server --watch api/db.json" object to the scripts in the package.json file(which will be generated after installing the babel and webpack starter)

So in the package.json file, it should look something like this

"name": "babel_webpack_starter",
  "version": "1.0.0",
  "description": "Starter pack for compiling ES6+ apps to ES5",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --output-public-path=/build/  --mode development --progress --open --hot",
    "build": "webpack --mode production --progress",
    "json:server": "json-server --watch api/db.json"


In order to run the server, you can use : npm run json-server

I have used the db.json file to store the database.


-----------------------------------------------------------------------------------------------------------------------

Due to time constraints and no electrity in my place during the coding hours, I wasn't able to execute the pagination and authentication 
features of the blog.

But i did manage to create a fully working CRUD(Create Read Update Delete) application using Vanilla Javascript.
------------------------------------------------------------------------------------------------------------------------
After installing all the dependencies , you can just use : npm run json:server and npm start , to view the application in your browser
