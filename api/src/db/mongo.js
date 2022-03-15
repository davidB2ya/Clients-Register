const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env

const connectionString = MONGO_DB_URI;

if (!connectionString) {
    console.error(
        'Remember that you must have a .env file with the environment variables defined and the MONGO_DB_URI'
    )
}

// Conection a mongoDB
mongoose
    .connect(connectionString, {
        // it allow users to fall back to the old parser if they find a bug in the new parser.
        useNewUrlParser: true,
        // it allows to use the new connection management engine of the MongoDB driver
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected')
    })
    .catch(err => {
        console.log(err)
    })

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
})