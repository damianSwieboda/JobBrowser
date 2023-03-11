const express = require('express');
const { default: mongoose } = require('mongoose');
const router = new express.Router();
const { auth }= require('../middleware/auth');
const fs = require('fs');

const Offer = require('../models/offer');
const Choice = require('../models/choices');
const Company = require('../models/company');
const User = require('../models/user');


router.get('/browse', auth, async (req, res, next) =>{
    try{
        const userChoice = await Choice.findOne({ owner: req.user._id }).select('saved ommited');
        const savedOffersIds = userChoice.saved;
        const ommitedOffersIds = userChoice.ommited;

        const fetchedOffers = await Offer.find({ _id: { $nin: [...savedOffersIds, ...ommitedOffersIds] } } ).limit(10);
        
        res.render('authorizedViews/browse', {fetchedOffers, title: 'Browse'});
    } catch(e){
        next(e);
    }
});

router.post('/browse', auth, async (req, res, next)=>{
    try{
        const { action, offerId } = req.body;
        const userId = req.user._id;

        await Choice.findOneAndUpdate({owner: userId},
            { $push: { [action]: offerId }
        }).select('owner');
        res.status(200).send({ message: 'The request was successful' });
    } catch(e){
        next(e);
    }
});


router.post('/browse/loadOffers', auth, async (req, res, next) => {
    try{
        const arrOfIds = req.body.generatedOffersIdsJSON
        const direction = req.body.direction
        let offers;

        if(direction==='onTop'){
            offers = await Offer.find({ _id: { $in: arrOfIds }})
            return res.send(offers)
        }
        
        const userChoices = await Choice.findOne({ owner: req.user._id }).select('saved ommited');
        const savedOffersIds = userChoices.saved;
        const ommitedOffersIds = userChoices.ommited;
 
        offers = await Offer.find({ _id: { $nin: [...savedOffersIds, ...ommitedOffersIds, ...arrOfIds] } } ).limit(3);
    
        res.send(offers);
    } catch(e){
        next(e);
    }
});
router.get('/saved', auth, async (req, res, next)=>{
    try{
        const savedOffersIds = (await Choice.findOne({owner: req.user._id}).select('saved')).saved;        
        
        const fetchedOffers = await Offer.find({ _id: { $in: savedOffersIds } } );
    
        res.render('authorizedViews/browse', { fetchedOffers, title: 'Saved' });
    } catch(e){
        next(e);
    }
});

router.get('/omitted', auth, async (req, res, next)=>{
    try{
        const ommitedOffersIds = (await Choice.findOne({owner: req.user._id}).select('ommited')).ommited;
        const fetchedOffers = await Offer.find({_id: { $in: ommitedOffersIds } } );
        res.render('authorizedViews/browse', { fetchedOffers, title: 'Ommited'});
    } catch(e){
        next(e);
    }
});

module.exports = router
