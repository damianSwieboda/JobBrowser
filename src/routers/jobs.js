const express = require('express');
const { default: mongoose } = require('mongoose');
const router = new express.Router();
const { auth }= require('../middleware/auth');
const fs = require('fs');

const { getNewSavedOfferIds, sortFetchedOffers } = require('./helpers/sortOffersHelpers')

const Offer = require('../models/offer');
const Choice = require('../models/choices');
const Company = require('../models/company');
const User = require('../models/user');


router.get('/browse', auth, async (req, res, next) =>{
    try{
        const userChoice = await Choice.findOne({ owner: req.user._id }).select('saved ommited');
        const savedOffersIds = userChoice.saved.map(offerData => offerData.offerId.toString());
        const ommitedOffersIds = userChoice.ommited.map(offerData => offerData.offerId.toString());

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
        const timeStamp = Date.now()

        await Choice.findOneAndUpdate({owner: userId},
            { $push: {
                 [action]: {offerId, timeStamp} 
                }
            }
        ).select('owner');
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
        const savedOffers = (await Choice.findOne({owner: req.user._id}).select('saved')).saved;
        const latestSavedOffersIds = getNewSavedOfferIds(savedOffers)
        const fetchedOffers = await Offer.find({ _id: { $in: latestSavedOffersIds } } );
        const sortedFetchedOffers = sortFetchedOffers(latestSavedOffersIds, fetchedOffers)

        res.render('authorizedViews/browse', { fetchedOffers: sortedFetchedOffers, title: 'Saved' });
    } catch(e){
        next(e);
    }
});

router.get('/omitted', auth, async (req, res, next)=>{
    try{
        const ommitedOffers = (await Choice.findOne({owner: req.user._id}).select('ommited')).ommited;
        const latesOmittedOffersIds = getNewSavedOfferIds(ommitedOffers)
        const fetchedOffers = await Offer.find({_id: { $in: latesOmittedOffersIds } } );
        const sortedFetchedOffers = sortFetchedOffers(latesOmittedOffersIds, fetchedOffers)

        res.render('authorizedViews/browse', { fetchedOffers: sortedFetchedOffers, title: 'Ommited'});
    } catch(e){
        next(e);
    }
});

module.exports = router
