import mongoose from "mongoose";
import crypto from "crypto";
import querystring from "querystring";

// Helper function to generate Gravatar URL
function getGravatarUrl(email, options = {}) {
    const {
        size = 200,
        default: defaultImg = 'identicon',
        rating = 'g'
    } = options;

    // Handle email trimming and lowercasing in the function instead of schema
    const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const hash = crypto
        .createHash('md5')
        .update(trimmedEmail)
        .digest('hex');

    const query = querystring.stringify({
        s: size,
        d: defaultImg,
        r: rating
    });

    return `https://www.gravatar.com/avatar/${hash}?${query}`;
}

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
});

// Middleware to set Gravatar before saving
userSchema.pre('save', function(next) {
    if (this.isNew && !this.avatar && this.email) {
        this.avatar = getGravatarUrl(this.email);
    }
    next();
});

// Virtual for Gravatar URL
userSchema.virtual('gravatar').get(function() {
    return getGravatarUrl(this.email);
});

// Method to get Gravatar with custom options
userSchema.methods.getGravatarUrl = function(options = {}) {
    return getGravatarUrl(this.email, options);
};

const User = mongoose.model("User", userSchema);

export default User;