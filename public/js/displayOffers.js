const offersList = document.querySelector('#offersList')
const arrayOfOffers = document.querySelectorAll('.dataContainer')


document.addEventListener('click', (e) =>{
    openOffer(e)
})

document.querySelector('#closePanelButton').addEventListener('click', ()=>{
    decisionPanel.style.display='none'
    offerContainer.innerHTML=''
    isPanelOpen = false
})


let lastFocusedElementID;
let isPanelOpen = false;
const decisionPanel = document.querySelector('#decisionPanel')
const offerContainer = document.querySelector('#offerContainer')

function openOffer(e){
    const focusedOfferID = e.target.parentElement.getAttribute('data-offer-id')

    if(focusedOfferID && isPanelOpen === false) {
        const offer = document.querySelector(`.x${focusedOfferID}`).parentElement
        lastFocusedElementID = focusedOfferID
        const clonedElements = offer.cloneNode(true)
        offerContainer.appendChild(clonedElements)
        decisionPanel.style.display='block'        
        isPanelOpen = true
        const focusedOffersParagraphs = document.querySelectorAll(`#offerContainer li p`)
        showParagraphs(focusedOffersParagraphs)
    }

}

function divideSkillsStringAndAddStyles(){
    const skillsInOffers =[
        ...document.querySelectorAll('#skillsMustHave'),
        ...document.querySelectorAll('#skillsNiceToHave')
    ]
    
    skillsInOffers.forEach(skillsMustHave=>{
        const skills = skillsMustHave.textContent.split(', ');
    
        skillsMustHave.innerHTML = '';
        
        //you cannot click offer on one of skills and open big screen
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
    })
}
divideSkillsStringAndAddStyles()

function showParagraphs(paragraphs){
    for(paragraph of paragraphs){
        paragraph.style.display = 'block'
    }
}

function hideParagraphs(paragraphs){
    for(paragraph of paragraphs){
        paragraph.style.display = 'none'
    }
}

