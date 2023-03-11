const offersList = document.querySelector('#offersList')
const decisionPanel = document.querySelector('#decisionPanel')
const offerContainer = document.querySelector('#offerContainer')

let isPanelOpen = false;
let focusedOffer;
let idOfCurrentOffer
let nextSiblingId;
let previousSiblingId;


function openOffer(e){
    const clickedOffer = e.target.closest('li');
    const idOfClickedOffer = clickedOffer ? clickedOffer.id : null;
    
    if(isPanelOpen === false) {
        decisionPanel.style.display='block'
        isPanelOpen = true

        loadOffer(idOfClickedOffer)
    }
}


function loadOffer(IdOfofferToLoad){
    focusedOffer = document.getElementById(IdOfofferToLoad)
    if(focusedOffer){
        const clonedElements = focusedOffer.cloneNode(true)
        offerContainer.appendChild(clonedElements)
        getSiblings(focusedOffer)
        unfoldOffer()
    }

}


function getSiblings(focusedOffer){
    if(focusedOffer.nextElementSibling){
        nextSiblingId = focusedOffer.nextElementSibling.getAttribute('id')
    }
    if(focusedOffer.previousElementSibling){
        previousSiblingId = focusedOffer.previousElementSibling.getAttribute('id') 
    }
}


function unfoldOffer(){
    const focusedOffersParagraphs = document.querySelectorAll(`#offerContainer li p`)
    for(paragraph of focusedOffersParagraphs){
        paragraph.style.display = 'block'
    }
}



document.querySelector('#closePanelButton').addEventListener('click', ()=>{
    decisionPanel.style.display='none'
    offerContainer.innerHTML=''
    isPanelOpen = false
})


document.querySelector('#nextOfferButton').addEventListener('click', ()=>{
    if(nextSiblingId){
        offerContainer.innerHTML = ''
        loadOffer(nextSiblingId)
    }
})

document.querySelector('#previousOfferButton').addEventListener('click', ()=>{
    if(previousSiblingId){
        offerContainer.innerHTML = ''
        loadOffer(previousSiblingId)
    }
})

// const offersIdsRemovedFromTop=[];
// function deleteOffersFrom(direction){
//     if(direction==='top'){
//         const offers = Array.from(document.querySelectorAll('.dataContainer')).slice(0, 10)
//         offers.forEach(offer=>{
//             const idOfOfferToRemove = document.getElementById(offer.id)

//             offersIdsRemovedFromTop.push(offer.id)
//             idOfOfferToRemove.parentNode.removeChild(idOfOfferToRemove)
//         })
//     }
// }

// let isFetching = false;
// let previousDistanceFromBottom=0;
// function fetchOffersIfNearBottom() {
//     let distanceFromBottom = offersList.scrollHeight - offersList.scrollTop - offersList.clientHeight;

//     if(previousDistanceFromBottom < distanceFromBottom){
//         if (!isFetching && distanceFromBottom < 150) {
//             isFetching = true;
        
//             fetchAndRefreshOffers('onBotton').then(() => {
//                 isFetching = false;
//             });
//         };
//     } else {
//         if (!isFetching && distanceFromBottom > 150) {
//             isFetching = true;
//             fetchAndRefreshOffers('onTop').then(() => {
//                 isFetching = false;
//             });
//         };
//     }
    
//     previousDistanceFromBottom = distanceFromBottom
// };
// offersList.addEventListener('scroll', _.debounce(fetchOffersIfNearBottom, 250));


let isFetching = false;
let lastScrollTop = 0;
let tolerance = 150; //pixels from top or botton

function fetchOffersIfNearTopOrBottom() {
    let scrollTop = offersList.scrollTop;
    let distanceFromBottom = offersList.scrollHeight - scrollTop - offersList.clientHeight;
    let scrollDirection = scrollTop > lastScrollTop ? "down" : "up";

    if (scrollDirection === "down" && !isFetching && distanceFromBottom < tolerance) {
        isFetching = true;
        fetchAndRefreshOffers('onBottom').then(() => isFetching = false);
    } 
  
    if (scrollDirection === "up" && !isFetching && scrollTop < tolerance) {
        isFetching = true;
        fetchAndRefreshOffers('onTop').then(() => isFetching = false);
    }

    lastScrollTop = scrollTop;
}
offersList.addEventListener('scroll', _.debounce(fetchOffersIfNearTopOrBottom, 250))




function createSkillSpans(skillsMustHave){
    const skills = skillsMustHave.textContent.split(', ');
    
    skillsMustHave.textContent = '';
            
    skills.forEach(skill => {
        const span = document.createElement('span')
        span.textContent = skill
        span.fontSize='0.5em'
        span.style.background = "rgb(32, 32, 32)"
        span.style.padding = "3px 6px"
        span.style.margin = "3px"
        span.style.display = "inline-block"
        span.style.borderRadius = "32px"
        skillsMustHave.appendChild(span)
    })
}


