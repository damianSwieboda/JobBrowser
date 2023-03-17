const saveButton = document.querySelector('#saveOfferButton')
const ommitButton = document.querySelector('#ommitOfferButton')
const backOfferButton = document.querySelector('#backOfferButton')

const closePanelButton = document.querySelector('#closePanelButton')
const nextOfferButton  = document.querySelector('#nextOfferButton')
const previousOfferButton = document.querySelector('#previousOfferButton')


if(titleOfPage==='Saved'){
    //hide save button (heart)
    saveButton.remove()
    // ommitButton.addEventListener('click', ()=>{
    //     sendData('omitted')
    //     removeOffer()
    
    //     if(generatedOffers.length < 5){
    //       fetchAndRefreshOffers()
    //     } 
    // })

    //change logic of back button
}
if(titleOfPage==='Omitted'){
        //hide delete button (Cross)
        ommitButton.remove()
        //change logic of back button

} 





saveButton.addEventListener('click', ()=>{
    sendData('saved')
    removeOffer()

    if(generatedOffers.length < 5){
      fetchAndRefreshOffers()
    } 
})


ommitButton.addEventListener('click', ()=>{
    sendData('omitted')
    removeOffer()

    if(generatedOffers.length < 5){
      fetchAndRefreshOffers()
    } 
})

backOfferButton.addEventListener('click', ()=>{
    sendData('back')
})



closePanelButton.addEventListener('click', ()=>{
    decisionPanel.style.display='none'
    offerContainer.innerHTML=''
    isPanelOpen = false
})


nextOfferButton.addEventListener('click', ()=>{
    if(nextSiblingId){        
        offerContainer.innerHTML = ''
        loadOffer(nextSiblingId)
    } else{
        fetchAndRefreshOffers('onBottom')
        .then(() => {
            getSiblings(focusedOffer)
            if(nextSiblingId){
                offerContainer.innerHTML = ''
            }
        })
        .then(() => {
            loadOffer(nextSiblingId)
        })
    }
})


previousOfferButton.addEventListener('click', ()=>{
    if(previousSiblingId){
        offerContainer.innerHTML = ''
        loadOffer(previousSiblingId)
    } else {
        fetchAndRefreshOffers('onTop')
        .then(() => {
            const idOfDisplayedOffer = offerContainer.children[0].getAttribute('cloned-id')
            focusedOffer = document.getElementById(idOfDisplayedOffer)

            getSiblings(focusedOffer)
            if(previousSiblingId) {
                offerContainer.innerHTML = ''
            }
            loadOffer(previousSiblingId)
        })
    }

})