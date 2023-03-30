module.exports = (req, res, next) =>{
    if(!req.user){
        res.send.status(401).send({error: 'You must log in'})
    }
    next();  // next is a third argument which is used to pass on the control to next middleware in the chain
    
}