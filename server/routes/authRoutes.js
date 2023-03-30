const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google',passport.authenticate('google',{
        scope: ['profile','email']  //scopes internally identified by google auth
    }))

    app.get
    ('/auth/google/callback', 
    passport.authenticate('google'),
        (req, res)=>{
            res.redirect('/landing');
        }
    )

    app.get('/api/current_user',(req, res)=>{
        console.log(req)
        res.send(req.session)
        //res.send(req.user);
        res.redirect('/');
    }) 
    
    app.get('/api/logout',(req,res)=>{
        req.logout();  // it takes in the cookie and kills it
        res.redirect('/')
    })
}

