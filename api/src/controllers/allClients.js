const client = require('../db/models/Client');

const allClientsRouter = require('express').Router();
const createClientsRouter = require('express').Router();
const updateClientsRouter = require('express').Router();
const deleteClientsRouter = require('express').Router();
const oneClientsRouter = require('express').Router();

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
updateClientsRouter.post('/update-client/:id', async (req, res) => {
    let id = req.params.id
    const { name, documenType, document, businessName, providers, sales } = req.body
    
    if (documenType === "CE" || documenType !== "CC")
    return res.status(400).json({ msg: 'Invalid Document Type.' })

    if (document.length < 10)
    return res.status(400).json({ msg: 'Invalid Document.' })

    client.updateOne(
        { _id:  id},
        {
            $set: {
                name: name,
                documenType: documenType,
                document: document,
                businessName: businessName,
                providers: providers,
                sales: sales
            }
        },
    ).then(function() {
        res.status(200).json({msg: 'Client updated successfully'})
    })
    .catch(error => console.error(error))
})

// Delete a client
deleteClientsRouter.delete('/delete-client/:id', async (req, res) => {
    let id = req.params.id

    client.deleteOne(
        { _id: id }
    ).then(function() {
        res.json({msg: 'Client removed successfully'})
    })
    .catch(error => console.error(error))
})


// Get search a client
oneClientsRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOneClient = await client.findById({ _id : id })  
    res.json(getOneClient)
    
})

module.exports = {
    allClientsRouter,
    createClientsRouter,
    updateClientsRouter,
    deleteClientsRouter,
    oneClientsRouter
}