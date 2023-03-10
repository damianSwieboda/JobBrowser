const saveButton = document.querySelector('#saveOfferButton')
const ommitButton = document.querySelector('#ommitOfferButton')
const backOfferButton = document.querySelector('#backOfferButton')
const generatedOffers = document.querySelectorAll('.dataContainer')

saveButton.addEventListener('click', ()=>{
    sendData('saved')
    removeOffer()

    if(generatedOffers.length < 5){
        fetchOffers()
    } 
})


ommitButton.addEventListener('click', ()=>{
    sendData('ommited')
    removeOffer()

    if(generatedOffers.length < 5){
        fetchOffers()
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

async function fetchOffers() {
  try {
    const IdsOfGeneratedOffers = [];

    const generatedOffers = document.querySelectorAll('.dataContainer')
    for (const offer of generatedOffers) {
      IdsOfGeneratedOffers.push(offer.id);
    }  

    const offersData = await fetch('http://localhost:3000/browse/loadOffers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generatedOffersIdsJSON: IdsOfGeneratedOffers })
    });
  
    const offers = await offersData.json();
    
    offers.forEach(offer=>{
      generateOffer(offer);
    })
      
    styleSkills()
    addEventListnersToOffers()
  } catch (error) {
    console.error(error);
  }
}



function generateOffer(offer) {
  const basicInformationsKeys = ["offerName", "companyName", "locations", "seniority", "skillsMustHave"]
  const unrenderedSalaries = ["B2Bsalary", "contractSalary", "mandateContractSalary"]

  const liElem = document.createElement("li")
  liElem.setAttribute("class", "dataContainer")
  liElem.setAttribute("id", offer._id)
  liElem.setAttribute("data-offer-id", offer._id)

  for (let key in offer) {
    if (key !== "_id") {
      let paragraph = createParagraph(key, offer)
      handleStylingCases(paragraph, key, offer, unrenderedSalaries, basicInformationsKeys)
      liElem.appendChild(paragraph);
    }
  }

  offersList.appendChild(liElem)
}

function createParagraph(key, offer) {
  let paragraph = document.createElement("p")
  paragraph.setAttribute("id", key)
  paragraph.textContent = offer[key].toString().replace(/,/g, ", ")
  return paragraph
}

function handleStylingCases(paragraph, key, offer, unrenderedSalaries, basicInformationsKeys) {
  if (unrenderedSalaries.length === 3 && unrenderedSalaries.includes(key)) {
    displaySalary(paragraph, offer)
    unrenderedSalaries.splice(key, 1)
  } else if (basicInformationsKeys.indexOf(key) === -1) {
    hideOfferDetails(paragraph, offer)
  }
}

function displaySalary(paragraph, offer) {
  paragraph.setAttribute("style", "display: inline-block")
  paragraph.setAttribute("class", `node x${offer._id}`)
}

function hideOfferDetails(paragraph, offer) {
  paragraph.setAttribute("style", "display: none")
  paragraph.setAttribute("class", `node x${offer._id}`)
}




