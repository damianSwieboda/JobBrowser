const mongoose = require('mongoose')

const companyAndTheirOffersSchema = new mongoose.Schema({
    companyName: {
        type:String,
    },
    jobOffers:[{
        isNewOffer:{type:Boolean, default: true},
        name:{type:String},
        locations:{type:Array},
        seniority:{type:Array},
        B2Bsalary:{type:String},
        B2Binformation:{type:String},
        contractSalary:{type:String},
        contractInformation:{type:String},
        skillsMustHave:{type:Array},
        skillsNiceToHave:{type:Array},
        jobDescription:{type:Array},
        dailyTasks:{type:Array},
        jobDetails:{type:Array},
        equipmentSupplied:{type:Array},
        methodology:{type:Array},
        perksInOfficeAndBenefits:{type:Array}
    }]
})

const CompanyAndTheirOffers = mongoose.model("CompanyAndTheirOffers", companyAndTheirOffersSchema)

module.exports = CompanyAndTheirOffers
