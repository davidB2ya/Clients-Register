const { Schema, model } = require('mongoose');

// schema creation for users
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name!'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please enter your email!'],
            trim: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Please enter your password!']
        },
        state: {
            // habilitarlo
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)
// fixes in userSchema
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

// compilation of user model
const User = model('User', userSchema)

module.exports = User