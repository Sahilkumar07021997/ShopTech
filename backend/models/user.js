//this is the user model schema
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//----------------------------------------------------------------//

const userSchema = new mongoose.Schema({  //----> creating user schema ---->
    name: {
        type: String,
        required: [true, 'please enter your name'],
        maxLength:[30,'Your name cannot exist 30 characters'],
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enter valid email address'],
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [6, 'your password must be at least 6 characters'],
        select:false
    },
    avatar: {   //basically to show the user image
        public_id: {
            type: String,
            required: [true]
        },
        url: {  //url for the cloudinary to show the user avatar image!
            type: String,
            required: [true]
        }
    },
    role: { //whether its user or admin
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
//Encryptying the password before saving the user --->
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    // hashing password into 10 characters
})

//Compare the user entered password with this.password --->
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

//returning a JWT token on successful authentication/login ---->
userSchema.methods.getJwtToken = function () {
    //returning the JWT signature with id,secret,expiration time of the token!
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generating password reset token using crypto(which is inbuilt)
userSchema.methods.getResetPasswordToken = function () {
    //generate new token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash and set to reset password token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    //set token expiration time also
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; //30minutes
    
    return resetToken
}

module.exports = mongoose.model('User', userSchema);
