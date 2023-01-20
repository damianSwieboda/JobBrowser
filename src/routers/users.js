const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { EmailIsInUseError } = require('./helpers/applicationError')
const { handleValidationErrors } = require('./helpers/handleErrors')
const { auth } = require('../middleware/auth')
const { handleDisplayingViewDetails } = require('../middleware/handleDisplayingViewDetails')



router.get('/', auth, (req, res)=>{
    res.render('unauthorizedViews/login')
})

router.get('/register', (req, res)=>{
    res.render('unauthorizedViews/register')
})

router.post('/register', async (req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email});
        if (user) throw new EmailIsInUseError()
        
        user = new User(req.body)
        await user.save() 

        res.render('unauthorizedViews/login', { messages: ['Succesfully Sign in!']})
    } catch(error){
        handleValidationErrors(error, req, res)
        res.status(500).send();
    }
})

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly=true; SameSite=Lax; Path='/'; Secure`);
        res.redirect('/browse');
    } catch(error){
        handleValidationErrors(error, req, res)
        res.status(500).send()
    }
})

router.get('/about', handleDisplayingViewDetails, (req, res) =>{
    console.log(req.renderUnauthorizedNavigation)
    res.render('about', {isUnauthorizedView: req.renderUnauthorizedNavigation})
})
module.exports = router
