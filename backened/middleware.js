const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./config')

const authMiddleware = (req,res,next) => {
    const auth = req.headers.authorization
    if (auth){
        let data = jwt.verify(auth,jwtSecret)
        req.userId = data.userId
        next()
    }else{
        res.json({msg:'plz Login'})
    }
}

module.exports = {
    authMiddleware
}
