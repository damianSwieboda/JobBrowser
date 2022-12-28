const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { AuthError } = require('../routers/helpers/applicationError')



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

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({ token })
    user.save()
    return token
}

userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({ email })

    if(!user){
        throw new AuthError('Wrong email, or password', 401)
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new AuthError('Wrong email, or password', 401)
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