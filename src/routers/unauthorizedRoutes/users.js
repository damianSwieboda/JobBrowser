const express = require('express')
const router = new express.Router()
const User = require('../../models/user')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {title:"Login"})
})

router.get('/register', (req, res)=>{
    // console.log(req.body)
    res.render('unauthorizedViews/register', {title:"Register"})
})

router.post('/user/reqister', async (req, res)=>{
    try{
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()

        const cookie = `token=${token}; samesite=lax; path=/ ;secure`
        const cookie2 = `refreshToken=${token}; samesite=lax; path=/ ;secure`

        res.setHeader("set-cookie", [cookie, cookie2])
        res.render('unauthorizedViews/login', {title:"Login"})
    } catch(error){
        if(error.name === 'ValidationError'){
            let errors = {}

            Object.keys(error.errors).forEach((key)=>{
                errors[key] = error.errors[key].message
            })
            return res.status(400).send(errors)
        }
        
        res.status(500).send();
      }
})

module.exports = router
















