const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const { auth }= require('../middleware/auth')
const fs = require('fs')

// const Interactions = require('../models/interactions')
const Offer = require('../models/offer')
const Company = require('../models/company')
const User = require('../models/user')


router.get('/browse', auth, async (req, res) =>{
    try{
        const fetchedOffers = await Offer.find({isNewOffer: true}, null, {limit: 5})
        res.render('authorizedViews/browse', {fetchedOffers})
    } catch(e){
        console.log(e.message)
    }
} )


module.exports = router

