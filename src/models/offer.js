
const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    companyName: {type:String},
    isNewOffer:{type:Boolean, default: true },
    offerName:{type:String},
    locations:{type:Array},
    seniority:{type:String},
    B2Bsalary:{type:String},
    B2Binformation:{type:String},
    contractSalary:{type:String},
    contractInformation:{type:String},
    mandateContractSalary:{type:String},
    mandateContractInformation:{type:String},
    skillsMustHave:{type:Array},
    skillsNiceToHave:{type:Array},
    jobDescription:{type:String},
    dailyTasks:{type:Array},
    jobDetails:{type:Array},
    equipmentSupplied:{type:Array},
    methodology:{type:Array},
    perksInOfficeAndBenefits:{type:Array},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company',
    },
},
{
    toObject: {
      transform: function (doc, ret, game) {
        delete ret.owner
        delete ret.isNewOffer
        delete ret.__v
      }
    }
})


const Offer = mongoose.model("Offer", offerSchema)

module.exports = Offer
