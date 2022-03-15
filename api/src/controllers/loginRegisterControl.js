const bcrypt = require('bcrypt');
const User = require('../db/models/User');

//Register

const registerRouter = require('express').Router();

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

registerRouter.post('/', async (req, res) => {

    try {
        const { name, email, password, location } = req.body;

        if (!name || !email || !password)
            return res.status(400).json({ msg: 'Please fill in all fields.' });

        if (!validateEmail(email))
            return res.status(400).json({ msg: 'Invalid emails.' });

        const role = location.pathname = '/register' ? 1 : 2;

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ msg: 'This email already exists.' });

        if (password.length < 6)
            return res
                .status(400)
                .json({ msg: 'Password must be at least 6 characters.' });

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            passwordHash,
            role
        });
        console.log(newUser);

        await newUser.save();
        res.json({ msg: 'User has been create!' });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//login

const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        const isMatch = user === null ? false : await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid password or user'
            })
        }

        // const refresh_token = createRefreshToken({ id: user._id })
        // console.log(refresh_token)
        res.send({
            email: user.email,
            role: user.role,
            // refresh_token,
            msg: 'Login success!'
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

module.exports = {
    registerRouter,
    loginRouter
}