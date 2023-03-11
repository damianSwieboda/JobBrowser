const saveButton = document.querySelector('#saveOfferButton')
const ommitButton = document.querySelector('#ommitOfferButton')
const backOfferButton = document.querySelector('#backOfferButton')
const generatedOffers = document.querySelectorAll('.dataContainer')

saveButton.addEventListener('click', ()=>{
    sendData('saved')
    removeOffer()

    if(generatedOffers.length < 5){
      fetchAndRefreshOffers()
    } 
})


ommitButton.addEventListener('click', ()=>{
    sendData('ommited')
    removeOffer()

    if(generatedOffers.length < 5){
      fetchAndRefreshOffers()
    } 
})

backOfferButton.addEventListener('click', ()=>{
    sendData('back')
})

function sendData(action) {
  let offerId;
  if (offerContainer.children.length > 0) {
      offerId = offerContainer.children[0].getAttribute('data-offer-id');
  } else {
    offerId = false;
  }

  if(offerId){
    fetch(`http://localhost:3000/browse`, {
      method: 'POST',
        body: JSON.stringify({action, offerId}),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then(res=>res)
    .catch(e=>console.log(e))
    }
}


function removeOffer(){
  offerContainer.textContent = ''

  if(nextSiblingId || previousSiblingId){
    if(focusedOffer){
      focusedOffer.remove()
      nextSiblingId ? loadOffer(nextSiblingId) : loadOffer(previousSiblingId)
    } 
  }
  if(!nextSiblingId && !previousSiblingId){
      decisionPanel.style.display='none'
      isPanelOpen = true
  }
}


















