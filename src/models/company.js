const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type:String,
    },
    isNewCompany:{type:Boolean, default: true},
    locations:{type:Array},
    skills:{type:Array},
    methodology:{type:Array},
    perksInOfficeAndBenefits:{type:Array}
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company


