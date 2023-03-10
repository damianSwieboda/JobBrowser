const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { extractToken, authenticate } = require('./auth');

const navigationMiddleware = async (req, res, next) => {
    try {
        const isAuthorized = await checkAuthorization(req);
        req.isAuthorized = !!isAuthorized;
        next();
    } catch (error) {
        next(error);
    }
  };
  
const checkAuthorization = async (req) => {
    try {
        const cookie = req.headers.cookie;
        if (cookie) {
            const token = cookie.replace("token=", "").split(";")[0];
            const { _id } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id, "tokens.token": token });
            return !!user;
        }
        return false;
    } catch (error) {
        throw new Error("Error checking authorization");
    }
};
  
module.exports = { navigationMiddleware, checkAuthorization }