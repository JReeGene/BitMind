const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please supply your email'],
        unique: true,
        lowercase: true,
    },
    membershipType:{
        type: String,
        lowercase: true,
        default: 'notMember',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: 'Passwords do not match!',
        }
    },
});

//MIDDLEWARE

userSchema.pre('save', async function(next){
    //Only run this function if the password was changed
    if(!this.isModified('password')) return next();

    //Has the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    //Delete password confirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function(next){
    //This points to the current query
    this.find({active: { $ne: false }});
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangeAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changeTimestamp = parseInt(
            this.passwordChangeAt.getTime()/1000,
            10
        );
        return JWTTimestamp < changeTimestamp;
    }
    //FALSE means no change
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;