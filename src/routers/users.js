const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/user/login', (req, res)=>{
    console.log(req.body)
    res.json('Check mail box')
})

router.post('/user/reqister', async (req, res)=>{
    try{
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.redirect('index.html', { user, token })
    } catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = router