const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const passwordValidationMessage = 'Provide minimum: 8 characters with atleast 1 uppercase, 1 lowercase, 1 number and 1 alphanumeric character'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 2,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error('Provide correct email')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minLength:[ 8, passwordValidationMessage],
        uppercase: [true, passwordValidationMessage],
        lowercase: [true, passwordValidationMessage],
        number: [true, passwordValidationMessage],
        nonalpha: [true, passwordValidationMessage] 
    },
    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({ token })
    
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User