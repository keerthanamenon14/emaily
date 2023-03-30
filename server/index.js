const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys =  require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser')
require('./services/passport')
require('./models/User')
require('./models/Survey')

mongoose.connect('mongodb+srv://keerthanamenon:passwordtest@cluster0.jahvjli.mongodb.net/?retryWrites=true&w=majority');
const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge : 30 * 24 * 60 * 60 * 1000, //30 days
        keys : [keys.cookieKey] 
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app)  //require takes in the function declared inside authRoutes and the second argument is passed into the function
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if(process.env.NODE_ENV === 'production'){
    //express will serve the prod assests like main.js , main.css
    app.use(express.static('client/build'))  // when the request comes in ,go to the client build folder and see if there is something matching

    //else
    //express will serve the index.html file
    //if it does'nt recognize the route
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000   
app.listen(PORT) // actually asking node js to listen to port 5000