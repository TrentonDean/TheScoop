const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req,res,next) => {
    jwt.verify(req.cookies.userToken, SECRET,(err,payload) => {
        if(err){
            console.log('authentication failed')
            res.status(401).json({verified:false})
        }else{
            console.log("authenticated")
            next()
        }
    })
}