const express = require('express')
const router = new express.Router()
const User = require('../../models/user')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {title:"Login"})
})

router.get('/register', (req, res)=>{
    console.log(req.body)
    res.render('unauthorizedViews/register', {title:"Register"})
})

router.post('/user/reqister', async (req, res)=>{
    try{
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        const cookie = `token=${token}; samesite=lax; path=/ ;secure`
        const cookie2 = `refreshToken=${token}; samesite=lax; path=/ ;secure`

        await user.save()        
        res.setHeader("set-cookie", [cookie, cookie2])
        res.redirect('/index.html')
    } catch(error){
        res.status(500).redirect('/register.html')
    }
})

module.exports = router