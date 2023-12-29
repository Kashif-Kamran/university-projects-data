const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        maxlength: [100,'Company name must be less than 100 characters'],
        minlength: [5,'Company name must be more than 5 characters']
    },
    title: {
        type: String,
        maxlength: [100,'Title must be less than 100 characters'],
    },
    firstName: {
        type: String,
        maxlength: [100,'First name must be less than 100 characters'],
    },
    middleName: {
        type: String,
        maxlength: [100,'Middle name must be less than 100 characters']
    },
    lastName: {
        type: String,
        maxlength: [100,'Last name must be less than 100 characters']
    },
    email: {
        type: String,
        maxlength: [100,'Email must be less than 100 characters'],
    },
    telephone: {
        type: String,
        maxlength: [100]
    },
    password: {
        type: String,
        maxlength: 100,
        minlength: [8,'Password must be more than 8 characters']
    },
    isSubscribed: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    add1: {
        type: String,
        maxlength: 100
    },
    add2: {
        type: String,
        maxlength: 100
    },
    add3: {
        type: String,
        maxlength: 100
    },
    add4: {
        type: String,
        maxlength: 100
    },
    postcode: {
        type: String,
        maxlength: 100
    },
    bankAccountNumber: {
        type: String,
        maxlength: 100
    },
    bankAccountSortCode: {
        type: String,

        maxlength: 100
    },
    subscriptionStatus: {
        type: String,
        maxlength: 100
    },
    fk_user_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    displayEmail: {
        type: String,
        maxlength: 100
    },
    forgetPassToken: {
        type: String,
        default: null
    },
    subscriptionDetail: String,
    lastSignIn: Date,
    imageFileName: String,
    stripeId: String,
    ReferralCode: String,
},{
    timestamps: true
});
// Function to hash the password before saving the user
userSchema.pre("save",async function (next)
{
    if (!this.isModified("password"))
    {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

// Function to compare the password with the hashed password
userSchema.methods.comparePassword = async function (password)
{
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);
module.exports = User;
