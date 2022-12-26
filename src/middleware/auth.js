const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { logInErrorFeedback } = require('../routers/helpers/generateFeedbackObject')

const auth = async (req, res, next) => {
    const token = req.headers.cookie.replace('token=', '').split(';')[0]

    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id, 'tokens.token': token })
    if(!user){
        return res.status(400).render('unauthorizedViews/login', {title:"Log in", ...logInErrorFeedback('Please authenticate')})
    }
    next()
}

module.exports = { auth }

'0dfac7cf8b00e50b7abdde0c244e826aadf427272ffd8b4dcff6aa34562dd88f223f39f479f354a92c9624656b18394e4b862c25d307d27b6f1ddb0171ed448e'