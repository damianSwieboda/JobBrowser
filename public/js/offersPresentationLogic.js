let offersList = document.querySelector('#offersList')
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
        clonedElements.removeAttribute('id')
        clonedElements.setAttribute('cloned-id', IdOfofferToLoad)
        
        offerContainer.appendChild(clonedElements)
        getSiblings(focusedOffer)
        unfoldOffer()
    }

}


function getSiblings(focusedOffer){
    if(focusedOffer.nextElementSibling){
        nextSiblingId = focusedOffer.nextElementSibling.getAttribute('id')
    } else {
        nextSiblingId = false
    }


    if(focusedOffer.previousElementSibling){
        previousSiblingId = focusedOffer.previousElementSibling.getAttribute('id') 
    } else {
        previousSiblingId = false
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



document.querySelector('#previousOfferButton').addEventListener('click', ()=>{
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


