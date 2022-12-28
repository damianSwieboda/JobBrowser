const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { AuthError } = require('../routers/helpers/applicationError')
const { handleValidationErrors } = require('../routers/helpers/handleErrors')


const auth = async (req, res, next) => {
    try{
        const token = req.headers.cookie.replace('token=', '').split(';')[0]
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await User.findOne({ _id, 'tokens.token': token })
        if(!user) throw AuthError('Not authorized', 403)
        
        next()
    } catch (error){
console.log(error)
    }

}

module.exports = { auth }

