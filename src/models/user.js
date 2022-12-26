const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



const passwordValidationMessage = 'Password require min. 8 characters, at least one letter, number and special character'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name must be at least two characters"],
        minLength: [2, "Name must be at least two characters"]
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error('Incorrect email')
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

userSchema.path('email').validate(async function(email){
    const emailCount = await User.count({ email })
    return !emailCount
}, 'Provided email is already in use')

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({ token })
    
    return token
}

userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({ email })

    const error =  new Error('')
    error.name = 'Authentication error'

    if(!user){
        throw error
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw error
    }

    return user
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