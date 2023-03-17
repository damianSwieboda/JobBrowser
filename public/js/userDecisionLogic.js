const generatedOffers = document.querySelectorAll('.dataContainer')

async function sendData(action) {
  let offerId;
  if (offerContainer.children.length > 0) {
      offerId = offerContainer.children[0].getAttribute('cloned-id');
  } else {
    offerId = false;
  }

  if(offerId){
    await fetch(`http://localhost:3000/browse`, {
      method: 'POST',
        body: JSON.stringify({action, offerId}),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then(res=>res.json())
    .then(data =>{
      generateOffer(data[0], 'back')
      styleSkills()
      addEventListnersToOffers()
    } )
    .then(() => {


      getSiblings(focusedOffer)
      if(nextSiblingId){
          offerContainer.innerText = ''
      }
  })
  .then(() => {
      loadOffer(previousSiblingId)
  })
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


















