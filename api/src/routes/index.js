const { Router } = require('express');
const router = Router()

// Import Controllers
const LoginRegisterControl = require('../controllers/loginRegisterControl')
const AllClientsControl = require('../controllers/allClients')


// Routes
router.use('/api/register', LoginRegisterControl.registerRouter);
router.use('/api/login', LoginRegisterControl.loginRouter);
router.use('/api/clients', AllClientsControl.allClientsRouter);
router.use('/api/clients', AllClientsControl.createClientsRouter);
router.use('/api/clients', AllClientsControl.updateClientsRouter);
router.use('/api/clients', AllClientsControl.deleteClientsRouter);
router.use('/api/clients', AllClientsControl.oneClientsRouter);

module.exports = router