const { Schema, model } = require('mongoose');

// required models
const User = require('../models/User')

// schema creation for clients
const clientSchema = new Schema(
    {
        id_user: { 
            type: Schema.ObjectId,
            ref: User
        },
        name: {
            type: String,
            required: [true, 'Please enter your name!'],
            trim: true
        },
        documenType : {
            type: String,
            required: [true, 'Please enter your document type!'],
            trim: true
        },
        document : {
            type: Number,
            required: [true, 'Please enter your document!'],
            unique: true
        },
        businessName: { 
            type: String, 
        },
        providers : {
            type: Array,
        },
        sales : {
            type : String,
        }
    },
    {
        timestamps: true
    }
)
// fixes in clientSchema
clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// compilation of client model
const Client = model('Client', clientSchema)

module.exports = Client