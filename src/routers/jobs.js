const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { auth }= require('../middleware/auth')
// const jobOffer = require('../models/jobOffer')

router.get('/browse', auth, (req, res) =>{
    res.send('lol')
} )

module.exports = router