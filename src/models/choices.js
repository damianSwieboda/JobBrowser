const mongoose = require('mongoose')

const choicesSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    saved:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    ommited:[{
        type: mongoose.Schema.Types.ObjectId
    }]
});

const Choices =  mongoose.model('Choices', choicesSchema);

module.exports = Choices