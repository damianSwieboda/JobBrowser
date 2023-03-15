function getNewSavedOfferIds(offers){
    offers.sort((a, b) => b.timeStamp - a.timeStamp).splice(10)
    return offers.map(offer =>offer.offerId.toString())   
}

function sortFetchedOffers(offersIds, fetchedOffers){
    let sortedOffers = [];
    offersIds.forEach((id)=>{
        fetchedOffers.forEach(offer => {
            if(id == offer._id){
                sortedOffers.push(offer)
            } 
        })
    } )
    return sortedOffers
}

module.exports = { getNewSavedOfferIds, sortFetchedOffers }