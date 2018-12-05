const mongoose = require('mongoose');
const Schema = mongoose.Schema; //schema is what we use to tell to mongoose about the very particular fields taht our model is going have
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function. (userSchema.pre is hook in lifecycle of the schema)
userSchema.pre('save', function (next) { 
    const user = this;

    // Generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err); }

        // Hash (Encrypt) our password using the salt then run callback (Salt + Hashed Password)
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) { return next(err); }
            
            // Overwrite plain text passowrd with encrypted password
            user.password = hash;
            next(); //go ahead and save the model
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) { return callback(err); }

        callback(null, isMatch);
    })
}

// Create Model class
const ModelClass = mongoose.model('user', userSchema);


// Export the model
module.exports = ModelClass;