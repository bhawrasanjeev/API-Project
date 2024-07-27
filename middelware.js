module .exports= reqFiter = (req, res,next)=>{
    if(!req.query.age){
        res.send( 'Please enter your age')
    }
    else if(req.query.age<18){
        res.send( 'You cannt acess this page')
    }
    else{next()};   
}