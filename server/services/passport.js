const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const keys = require('./config/keys');
const mongoose = require('mongoose')

require('../models/User');

const keys = {
    googleClientID : "727484673849-a7868p3t8r7663g1mmt2gg4fbvdcsoen.apps.googleusercontent.com",
    googleClientSecret : "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",
    mongoURI: 'mongodb+srv://keerthanamenon:passwordtest@cluster0.jahvjli.mongodb.net/?retryWrites=true&w=majority',
    cookieKey: 'redacted'
}
const User = mongoose.model('users') //fetching schema

passport.serializeUser((user, done)=>{   // user =  what we pulled from database below
    done(null, user.id)  // we are not using the profile id , we are using the unique id created by mongo
})

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user => {
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'  // this will be the route to which the user will be redirected after successful authentication
    },
    async (accessToken, refreshToken, profile, done)=>{
        const existingUser = await User.findOne({googleId: profile.Id})
        if(existingUser){
            //we already have a record with the given profile id
            done(null, existingUser) // first argument is passing error, since we do not face any error we pass null
        }
        const user = await new User({googleId: profile.Id}).save()
        done(null,user);
    }
));

