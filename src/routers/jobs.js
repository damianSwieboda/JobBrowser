const express = require('express')
const { default: mongoose } = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const { auth }= require('../middleware/auth')
// const jobOffer = require('../models/jobOffer')

router.get('/browse', auth, (req, res) =>{
    const jobOffer = {
        "_id":{
            "$oid":"62a686448d7b0d546e28951e"
        },
        "companyName":"Affee360",
        "jobOffers":{
            "offerName":"Junior Fullstack JavaScript Developer",
            "locations":["Worcław, Kasztanowa"],
            "seniority":"Junior",
            "salaries":{
                "B2B":{
                    "salarySum":"3 500 - 7 000 PLN",
                    "salaryInformation":"+ vat (B2B) miesięcznie "
                },
                "UZ":{
                    "salarySum":"3 500 - 7 000 PLN",
                    "salaryInformation":"brutto miesięcznie (UZ) "
                }
            },
            "requiredSkills":{
                "mustHave":["JavaScript","Git","TypeScript","React","Node","MongoDB"],
                "niceToHave":["Docker","HTML","Problem solving"]},
                "briefJobDescription":"Realizujemy projekty w obszarach E-commerce, Marketing Automation i Web/Mobile Application.\nRozwijany dwa własne projekty fordevelop i Affee360 Space i równie ambitne projekty klientów.\n\nSzukamy ludzi z inicjatywą, szukających nowych rozwiązań i chcących się rozwijać. \nJeśli lubisz ambitne projekty, lubisz mieć wpływ na to jak pracujesz i swoje otoczenie - aplikuj, zapraszamy!\n\n",
                "dailyTasks":[],
                "jobDetails":["Język rekrutacji: pl","Start ASAP","Stała długość kontraktu","Płatny urlop dla: B2B","Praca w pełnym wymiarze","Praca zdalna: Elastyczna liczba dni w tygodniu","Elastyczne godziny pracy","Brak podróży służbowych","Głównie nowe funkcjonalności"],
                "equipmentSupplied":["Apple","Komputer: Notebook","Monitory: Opcjonalnie"],
                "methodology":["Agile management","Knowledge repository","Code reviews: Bitbucket","Version control system: GIT","Swoboda wyboru narzędzi"],
                "perksInOfficeAndBenefits":["Free coffee","Bike parking","Free parking","Flat structure","Small teams","International projects"],
                "date":{
                    "$date":{
                        "$numberLong":"1655080516409"
                    }
                }
            }, 
            "__v":{"$numberInt":"0"}}
    
    res.render('authorizedViews/browse', jobOffer)
} )

module.exports = router

