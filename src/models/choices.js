const mongoose = require('mongoose')

const choicesSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    saved:[{
        offerId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        timeStamp:{
            type: Number,
            required: true
        }
    }],
    omitted:[{
        offerId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        timeStamp:{
            type: Number,
            required: true
        }
    }],
});

const Choices =  mongoose.model('Choices', choicesSchema);

module.exports = Choices