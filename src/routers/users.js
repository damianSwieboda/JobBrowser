const express = require('express');
const { default: mongoose } = require('mongoose');
const router = new express.Router();
const { EmailIsInUseError } = require('./helpers/applicationError');
const { auth } = require('../middleware/auth');
const { extractToken, authenticate  } = require('../middleware/auth');

const User = require('../models/user');
const Choice = require('../models/choices');


router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login');
});

router.get('/register', auth, (req, res)=>{
    res.render('unauthorizedViews/register');
});

router.post('/register', async (req, res, next)=>{
    try{
        let user = await User.findOne({email: req.body.email});
        if (user) throw new EmailIsInUseError();
        
        user = new User(req.body);
        await user.save();

        const userDecisions = new Choice({owner: user._id});
        await userDecisions.save();

        res.render('unauthorizedViews/login', { messages: ['Succesfully Sign in!']});
    } catch(e){
        next(e);
    }
})

router.post('/login', async (req, res, next)=>{    
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly=true; SameSite=Lax; Path='/'; Secure`);
        res.redirect('/browse');
    } catch(e){
        next(e);
    }
})

router.get('/about', async (req, res, next) =>{
    try{
        let user = false;
        const token = extractToken(req);

        if(token){
            user = await authenticate(token, next);
        };

        
        const isAuthorized = !!user;

        res.render('about', { isAuthorized });
    } catch(e){
        next(e);
    }
})

module.exports = router
