const { Router } = require('express');
const router = Router()

// Import Controllers
const LoginRegisterControl = require('../controllers/loginRegisterControl')


// Routes
router.use('/api/register', LoginRegisterControl.registerRouter);
router.use('/api/login', LoginRegisterControl.loginRouter);


module.exports = router