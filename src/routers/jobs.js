const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { auth }= require('../middleware/auth')
const CompanyAndTheirOffers = require('../models/companyAndOffers')


router.get('/browse', auth, async (req, res) =>{
    //temporary creating new mongo document
    const newCompanyAndOffer = new CompanyAndTheirOffers(offer)
    await newCompanyAndOffer.save()

    const fetchedOffers = await CompanyAndTheirOffers.findOne({_id: newCompanyAndOffer._id})
    res.render('authorizedViews/browse', {fetchedOffers})
} )


const offer = {
    companyName:"Affee360",
    jobOffers:[{
        name:"Junior Fullstack JavaScript Developer",
        locations:["Worcław, Kasztanowa"],
        seniority:["Junior"],
        B2Bsalary:"3 500 - 7 000 PLN",
        B2Binformation:"+ vat (B2B) miesięcznie ",
        contractSalary:"3 500 - 7 000 PLN",
        contractInformation:"brutto miesięcznie (UZ) ",
        skillsMustHave:["JavaScript","Git","TypeScript","React","Node","MongoDB"],
        skillsNiceToHave:["Docker","HTML","Problem solving"],
        jobDescription:"Realizujemy projekty w obszarach E-commerce, Marketing Automation i Web/Mobile Application.\nRozwijany dwa własne projekty fordevelop i Affee360 Space i równie ambitne projekty klientów.\n\nSzukamy ludzi z inicjatywą, szukających nowych rozwiązań i chcących się rozwijać. \nJeśli lubisz ambitne projekty, lubisz mieć wpływ na to jak pracujesz i swoje otoczenie - aplikuj, zapraszamy!\n\n",
        jobDetails:["Język rekrutacji: pl","Start ASAP","Stała długość kontraktu","Płatny urlop dla: B2B","Praca w pełnym wymiarze","Praca zdalna: Elastyczna liczba dni w tygodniu","Elastyczne godziny pracy","Brak podróży służbowych","Głównie nowe funkcjonalności"],
        equipmentSupplied:["Apple","Komputer: Notebook","Monitory: Opcjonalnie"],
        methodology:["Agile management","Knowledge repository","Code reviews: Bitbucket","Version control system: GIT","Swoboda wyboru narzędzi"],
        perksInOfficeAndBenefits:["Free coffee","Bike parking","Free parking","Flat structure","Small teams","International projects"],
    }], 
}

module.exports = router

