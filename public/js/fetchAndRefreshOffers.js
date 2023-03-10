
const idsOfAllAlreadyFetchedOffers = [];
const hiddenOffers = [];

async function fetchAndRefreshOffers() {
  try {
    takeAlreadyFetchedOffers()
 
    const fetchedOffersData = await fetchOffers()
    const offers = await fetchedOffersData.json()
    offers.forEach(offer=>{
      generateOffer(offer); // this fn is in generateOffersFile file
    })

    let arrayOfOffers = document.querySelectorAll('.dataContainer')
    if(arrayOfOffers.length > 15) deleteOffersFrom('top');

    styleSkills()
    addEventListnersToOffers()
  } catch (error) {
    console.error(error);
  }
}


function takeAlreadyFetchedOffers(){
    const generatedOffers = document.querySelectorAll('.dataContainer')
    idsOfAllAlreadyFetchedOffers.push([...hiddenOffers])
    for (const offer of generatedOffers) {
        idsOfAllAlreadyFetchedOffers.push(offer.id);
    }  
}

async function fetchOffers(){
    const response = await fetch('http://localhost:3000/browse/loadOffers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ generatedOffersIdsJSON: idsOfAllAlreadyFetchedOffers })
    });
    return response;
  }

function deleteOffersFrom(direction){
    if(direction==='top'){
        const offers = Array.from(document.querySelectorAll('.dataContainer')).slice(0, 10)
        offers.forEach(offer=>{
          const idOfOfferToRemove = document.getElementById(offer.id)

          offersIdsRemovedFromTop.push(offer.id)
          idOfOfferToRemove.parentNode.removeChild(idOfOfferToRemove)
      })
      return 
    }
}


function addEventListnersToOffers(){
    arrayOfOffers = document.querySelectorAll('.dataContainer')
    arrayOfOffers.forEach(element =>{
        element.addEventListener('click', (e) => openOffer(e)
        )
    })    
  }
  addEventListnersToOffers()