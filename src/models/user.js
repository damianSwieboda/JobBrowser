const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



const passwordValidationMessage = 'Minimum eight characters, at least one letter, one number and one special character'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Provide minimum 2 characters"],
        minLength: [2, "Provide minimum 2 characters"]
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique:[true, 'Provided email is already in use'],
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
        minLength:[8, passwordValidationMessage],
        validate(password){
            if(!password.match(passwordRegex)){
                throw new Error(passwordValidationMessage)
            }
        }
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
    
    return token
}

userSchema.pre('save', async function(next){
    const user = this
    
    if (this.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User