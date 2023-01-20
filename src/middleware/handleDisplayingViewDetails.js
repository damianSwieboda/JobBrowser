const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleDisplayingViewDetails = async (req, res, next) => {
    try {
        const cookie = req.headers.cookie
         
        if(cookie) {
            const token = cookie.replace('token=', '').split(';')[0]
            const { _id } = jwt.verify(token, process.env.JWT_SECRET)   
            const user = await User.findOne({ _id, 'tokens.token': token })
            
            if(req.path === '/about' && user) next() 
        }
        req.renderUnauthorizedNavigation = true

        next()
    } catch(e){
        console.log(e.message)
    }
}

module.exports = { handleDisplayingViewDetails }