const express = require('express')
const router = new express.Router()
const User = require('../../models/user')
const { generateErrorObjectToRenderForPUG } = require('./helpers/errorRegisterObjectToRender')

router.get('/', (req, res)=>{
    res.render('unauthorizedViews/login', {title:"Login"})
})

router.get('/register', (req, res)=>{
    // console.log(req.body)
    res.render('unauthorizedViews/register', {title:"Sign in"})
})

router.post('/user/reqister', async (req, res)=>{
    try{
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()

        const cookie = `token=${token}; samesite=lax; path=/ ;secure`
        const cookie2 = `refreshToken=${token}; samesite=lax; path=/ ;secure`

        res.setHeader("set-cookie", [cookie, cookie2])
        res.render('unauthorizedViews/login', {title:"Sign in"})
    } catch(error){

        if(error.name === 'ValidationError'){
            const errorObject = generateErrorObjectToRenderForPUG(error)
            errorObject.alredyProvidedName = req.body.name.trim() || '' 
            errorObject.alredyProvidedEmail = req.body.email || ''

            console.log(errorObject)
            return res.status(400).render('unauthorizedViews/register', {title:"Sign in", ...errorObject})
        }
        
        res.status(500).send();
      }
})

module.exports = router
















