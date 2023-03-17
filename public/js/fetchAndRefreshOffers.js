
const idsOfAllAlreadyFetchedOffers = [];
const hiddenOffers = [];
const amountOfoffersToFetchOrHide = 3

async function fetchAndRefreshOffers(direction) {
  try {
    takeAlreadyFetchedOffers()

    const fetchedOffersData = await fetchOffers(direction)
    const offers = await fetchedOffersData.json()
    offers.reverse().forEach(offer=>{
      generateOffer(offer, direction); // this fn is in generateOffers  file
    })

    let arrayOfOffers = document.querySelectorAll('.dataContainer')
    if(arrayOfOffers.length > 12) deleteOffersFrom(direction);

    styleSkills()
    addEventListnersToOffers()
  } catch (error) {
    console.error(error.message);
  }
}

function styleSkills(){
  const skillsMusToHave = document.querySelectorAll('#skillsMustHave');
  const skillsNiceToHave = document.querySelectorAll('#skillsNiceToHave');
  skillsInOffers = [...skillsMusToHave, ...skillsNiceToHave]

  skillsInOffers.forEach(skill =>{
    const isStyled = skill.querySelector('span');
    if(!isStyled){
      createSkillSpans(skill);
    }
    
  })
}
styleSkills()


function takeAlreadyFetchedOffers(){
  const generatedOffers = document.getElementById('offersList').querySelectorAll('.dataContainer')
  idsOfAllAlreadyFetchedOffers.length = 0
  for (const offer of generatedOffers) {
    idsOfAllAlreadyFetchedOffers.push(offer.id);
  } 
  if(!!hiddenOffers.length) idsOfAllAlreadyFetchedOffers.push(...hiddenOffers)
}


const titleOfPage = document.querySelector('h2').innerText
let restOfLink = ''
if(titleOfPage==='Saved') restOfLink = '/saved'
if(titleOfPage==='Omitted') restOfLink = '/omitted'

async function fetchOffers(direction){
  let offersToFetch;
  
  if(direction == 'onBottom') offersToFetch = idsOfAllAlreadyFetchedOffers
  let lengthOfhiddenOffers = hiddenOffers.length
  if(direction == 'onTop') offersToFetch = hiddenOffers.slice(lengthOfhiddenOffers-amountOfoffersToFetchOrHide, lengthOfhiddenOffers)

  
  const response = await fetch(`http://localhost:3000/browse/loadOffers${restOfLink}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ generatedOffersIdsJSON: offersToFetch, direction: direction })
  })

  if(direction == 'onTop') {
    hiddenOffers.splice(-amountOfoffersToFetchOrHide)
  }
  return response;
}
    
function deleteOffersFrom(direction){
  if(direction==='onBottom'){
    const offers = Array.from(document.getElementById('offersList').querySelectorAll('.dataContainer')).slice(0, amountOfoffersToFetchOrHide)
    offers.forEach(offer=>{
    const childToRemove = document.getElementById(offer.id)

    hiddenOffers.push(offer.id)
       childToRemove.parentNode.removeChild(childToRemove)
    }) 
  }

  if(direction==='onTop'){
    const offers = Array.from(document.getElementById('offersList').querySelectorAll('.dataContainer')).slice(-amountOfoffersToFetchOrHide)

    offers.forEach(offer=>{
      const childToRemove = document.getElementById(offer.id)
      childToRemove.parentNode.removeChild(childToRemove)
    })
  }
}


function addEventListnersToOffers(){
  arrayOfOffers = document.querySelectorAll('.dataContainer')
  arrayOfOffers.forEach(element =>{
    element.addEventListener('click', (e) => openOffer(e)) // openOffer fn is in offersPresentationLogic file
  })    
}
addEventListnersToOffers()