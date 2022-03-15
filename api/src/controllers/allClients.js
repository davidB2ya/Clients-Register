const client = require('../db/models/Client');

const allClientsRouter = require('express').Router();
const createClientsRouter = require('express').Router();
const updateClientsRouter = require('express').Router();
const deleteClientsRouter = require('express').Router();

// Get all clients
allClientsRouter.get('/all-clients', async (req, res) => {
    try {
        const clients = await client.find()
        res.json(clients)
    } catch (error) {
        next(error)
    }
})

// Post create a client
createClientsRouter.post('/create-client', async (req, res) => {
    try {
        const { name, documenType, document, businessName, providers, sales } = req.body

        if (!name || !documenType || !document || !businessName || !providers || !sales) {
            return res.status(400).json({ msg: 'Please fill in all fields.' })
        }

        const clientValid = await client.findOne({ document })
        if (clientValid) {
            return res.status(401).json({ msg: 'This client already exists.' })
        }

        if (documenType === "CE" || documenType !== "CC")
            return res.status(402).json({ msg: 'Invalid Document Type.' })

        if (document.length < 10)
            return res.status(403).json({ msg: 'Invalid Document.' })

        const newClient = new client({
            name: req.body.name,
            documenType: req.body.documenType,
            document: req.body.document,
            businessName: req.body.businessName,
            providers: req.body.providers,
            sales: req.body.sales,
        })
        await newClient.save()
        res.json({ msg: 'New client successfully created' })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Post update a client
updateClientsRouter.post('/update-client', async (req, res) => {
    const body = req.body

    client.updateOne(
        { _id:  body.id },
        {
            $set: {
                name: body.name,
                documenType: body.documenType,
                document: body.document,
                businessName: body.businessName,
                providers: body.providers,
                sales: body.sales
            }
        },
    ).then(function() {
        res.json({msg: 'Client updated successfully'})
    })
    .catch(error => console.error(error))
})

// Delete a client
deleteClientsRouter.delete('/delete-client', async (req, res) => {
    const body = req.body

    client.deleteOne(
        { _id:  body.id }
    ).then(function() {
        res.json({msg: 'Client removed successfully'})
    })
    .catch(error => console.error(error))
})


module.exports = {
    allClientsRouter,
    createClientsRouter,
    updateClientsRouter,
    deleteClientsRouter
}