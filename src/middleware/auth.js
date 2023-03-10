const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { AuthError } = require('../routers/helpers/applicationError');


const auth = async (req, res, next) => {
    try {
        if (req.path === '/' || req.path === '/register') {
            return handleRootEndpoint(req, res, next);
        };

        const token = extractToken(req);
        if(!token) throw new AuthError();
        
        const user = await authenticate(token, next);
        if (!user)  throw new AuthError(); 
        
        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
};


const handleRootEndpoint = async (req, res, next) => {
    const token = extractToken(req);
    if (!token) {
        return next();
    }
    const user = await authenticate(token, next);
    if (user) {
        return res.redirect('/browse');
    } else {
        return next();
    }
};


const extractToken = (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) {
        return false;
    }

    const tokenIndex = cookie.indexOf('token');
    if (tokenIndex === -1) {
        return false;
    }

    return cookie.replace('token=', '').split(';')[0];
};

const authenticate = async (token, next) => {
    try{  
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);       
        const user = await User.findOne({ _id, 'tokens.token': token });

        return user;
    } catch(error){
        throw error;
    };
};

module.exports = { auth, extractToken, authenticate }

