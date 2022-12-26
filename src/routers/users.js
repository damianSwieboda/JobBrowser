const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { generateErrorFeedback, signInSuccesfulFeedback, logInErrorFeedback } = require('./helpers/generateFeedbackObject')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {isUnauthorizedView: true})
})

router.get('/register', (req, res)=>{
    res.render('unauthorizedViews/register', {isUnauthorizedView: true})
})

router.post('/reqister', async (req, res)=>{
    try{      
        const user = new User(req.body)
        await user.save()

        res.render('unauthorizedViews/login', {isUnauthorizedView: true, ...signInSuccesfulFeedback})
            
    } catch(error){
        if(error.name === 'ValidationError'){
            const signInFeedback = generateErrorFeedback(error)
            signInFeedback.alredyProvidedName = req.body.name.trim() || '' 
            signInFeedback.alredyProvidedEmail = req.body.email || ''

            return res.status(400).render('unauthorizedViews/register', {isUnauthorized: true, ...signInFeedback})
        }

        res.status(500).send();
    }
})

router.post('/login', async (req, res)=>{

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        const cookie = `token=${token}; samesite=lax; path=/ ;secure`
        const cookie2 = `refreshToken=${token}; samesite=lax; path=/ ;secure`
        res.setHeader("set-cookie", [cookie, cookie2])
        
        res.render('authorizedViews/browse')
    } catch(error){
        if(error.name === 'Authentication error'){
            return res.status(400).render('unauthorizedViews/login', {
                isUnauthorizedView: true,
                alredyProvidedEmail: req.body.email,
                ...logInErrorFeedback('Wrong email, or password ')})
        }

        res.status(500).send()
    }

})

router.get('/about', (req, res)=>{
    res.render('about', {isUnauthorizedView: true})
})
module.exports = router














