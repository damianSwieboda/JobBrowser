const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { EmailIsInUseError } = require('./helpers/applicationError')
const { handleValidationErrors } = require('./helpers/handleErrors')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {isUnauthorizedView: true})
})

router.get('/register', (req, res)=>{
    res.render('unauthorizedViews/register', {isUnauthorizedView: true})
})

router.post('/register', async (req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email});
        if (user) throw new EmailIsInUseError()
        
        user = new User(req.body)
        await user.save() 

        res.render('unauthorizedViews/login', {isUnauthorizedView: true, messages: ['Succesfully Sign in!']})
    } catch(error){
        handleValidationErrors(error, req, res)
        res.status(500).send();
    }
})

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('token', token)
        
        res.redirect('/browse')
    } catch(error){
        handleValidationErrors(error, req, res)
        res.status(500).send()
    }

})

router.get('/about', (req, res)=>{
    res.render('about', {isUnauthorizedView: true})
})
module.exports = router
