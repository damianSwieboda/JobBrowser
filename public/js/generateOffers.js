
function generateOffer(offer, direction) {
    const basicInformationsKeys = ["offerName", "companyName", "locations", "seniority", "skillsMustHave"]
    const unrenderedSalaries = ["B2Bsalary", "contractSalary", "mandateContractSalary"]
  
    const liElem = document.createElement("li")
    liElem.setAttribute("class", "dataContainer")
    liElem.setAttribute("id", offer._id)
  
    for (let key in offer) {
      if (key !== "_id") {
        let paragraph = createParagraph(key, offer)
        handleStylingCases(paragraph, key, offer, unrenderedSalaries, basicInformationsKeys)
        liElem.appendChild(paragraph);
      }
    }
    if(direction==='onTop'){
      return offersList.insertBefore(liElem, offersList.firstChild)
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
  