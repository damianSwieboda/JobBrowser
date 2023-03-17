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
        const userChoice = await Choice.findOne({ owner: req.user._id }).select('saved omitted');
        const savedOffersIds = userChoice.saved.map(offerData => offerData.offerId.toString());
        const omittedOffersIds = userChoice.omitted.map(offerData => offerData.offerId.toString());

        const fetchedOffers = await Offer.find({ _id: { $nin: [...savedOffersIds, ...omittedOffersIds] } } ).limit(10);
        
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

        if (action === "back") {
            const { saved, omitted } = await Choice.findOne({ owner: userId }).select('saved omitted')
            const idOfLastOffer = [...saved, ...omitted].sort((a, b) => b.timeStamp - a.timeStamp)[0].offerId.toString()
          
            await Choice.findOneAndUpdate({ owner: userId },
                {
                  $pull: {
                    saved: { offerId: idOfLastOffer },
                    omitted: { offerId: idOfLastOffer }
                  }
                }
            );

            const offerToReturn = await Offer.find({ _id: idOfLastOffer})
            return res.send(offerToReturn)
            // return res.send()
        }

        await Choice.findOneAndUpdate({owner: userId},
            { $push: {
                 [action]: {offerId, timeStamp} 
                }
            }
        ).select('owner');
        res.status(200).send();
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
        
        const userChoices = await Choice.findOne({ owner: req.user._id }).select('saved omitted');
        const savedOffersIds = userChoices.saved.map(offer =>offer.offerId.toString());
        const omittedOffersIds = userChoices.omitted.map(offer =>offer.offerId.toString());

        offers = await Offer.find({ _id: { $nin: [...savedOffersIds, ...omittedOffersIds, ...arrOfIds] } } ).limit(3);
    
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

router.post('/browse/loadOffers/saved', auth, async (req, res, next) => {
    try{
        const arrOfIds = req.body.generatedOffersIdsJSON
        const direction = req.body.direction
        let offers;

        if(direction==='onTop'){
            offers = await Offer.find({ _id: { $in: arrOfIds }})
            offers = offers.reverse()
            return res.send(offers)
        }
        
        const userChoices = await Choice.findOne({ owner: req.user._id }).select('saved');
        const savedOffersIds = userChoices.saved.map(offer =>offer.offerId.toString());
        offers = await Offer.find({ _id: {  $nin: arrOfIds, $in: savedOffersIds } } ).limit(3);

        res.send(offers);
    } catch(e){
        next(e);
    }
});

router.get('/omitted', auth, async (req, res, next)=>{
    try{
        const omittedOffers = (await Choice.findOne({owner: req.user._id}).select('omitted')).omitted;
        const latesOmittedOffersIds = getNewSavedOfferIds(omittedOffers)
        const fetchedOffers = await Offer.find({_id: { $in: latesOmittedOffersIds } } );
        const sortedFetchedOffers = sortFetchedOffers(latesOmittedOffersIds, fetchedOffers)

        res.render('authorizedViews/browse', { fetchedOffers: sortedFetchedOffers, title: 'Omitted'});
    } catch(e){
        next(e);
    }
});

router.post('/browse/loadOffers/omitted', auth, async (req, res, next) => {
    try{
        const arrOfIds = req.body.generatedOffersIdsJSON
        const direction = req.body.direction
        let offers;

        if(direction==='onTop'){
            offers = await Offer.find({ _id: { $in: arrOfIds }})
            offers = offers.reverse()
            return res.send(offers)
        }
        
        const userChoices = await Choice.findOne({ owner: req.user._id }).select('omitted');
        const omittedOffersIds = userChoices.omitted.map(offer =>offer.offerId.toString());
        offers = await Offer.find({ _id: {  $nin: arrOfIds, $in: omittedOffersIds } } ).limit(3);

        res.send(offers);
    } catch(e){
        next(e);
    }
});


module.exports = router
