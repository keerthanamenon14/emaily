module.exports = (req, res, next) =>{
    if(req.user.credits < 1){
        res.send.status(403).send({error: 'No enough credits!'})
    }
    next();  // next is a third argument which is used to pass on the control to next middleware in the chain 
}