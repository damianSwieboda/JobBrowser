const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../../models/user')
const { generateErrorFeedback, signInSuccesfulFeedback, logInErrorFeedback }= require('./helpers/generateFeedbackObject')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {title:"Log in"})
})

router.get('/register', (req, res)=>{
    res.render('unauthorizedViews/register', {title:"Sign in"})
})

router.post('/reqister', async (req, res)=>{
    try{      
        const user = new User(req.body)
        await user.save()

        res.render('unauthorizedViews/login', {title:"Log in", ...signInSuccesfulFeedback})
            
    } catch(error){
        if(error.name === 'ValidationError'){
            const signInFeedback = generateErrorFeedback(error)
            signInFeedback.alredyProvidedName = req.body.name.trim() || '' 
            signInFeedback.alredyProvidedEmail = req.body.email || ''

            return res.status(400).render('unauthorizedViews/register', {title:"Sign in", ...signInFeedback})
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
        
        res.render('authorizedViews/')
    } catch(error){
        if(error.name === 'Authentication error'){
            return res.render('unauthorizedViews/login', {title:"Log in", ...logInErrorFeedback})
        }

        res.status(500).send()
    }

})
module.exports = router














