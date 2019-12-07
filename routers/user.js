const express = require('express')
const User = require('../models/User');
const auth = require('../middleware/auth');
const logger = require('../logger');
const router = express.Router()

router.post('/register', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        logger.info({
            viewsName: 'users/register',
            data: 'One more user is created'
        });
    } catch (error) {
        logger.info({
            viewsName: 'users/register',
            data: 'Something goes wrong. Status code: 400'
        });
        res.status(400).send(error)
    }
});

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        logger.info({
            viewsName: 'users/login',
            data: 'User is logged in'
        });
        res.send({ user, token })
    } catch (error) {
        logger.info({
            viewsName: 'users/login',
            data: 'Login request failed'
        });
        res.status(400).send(error)
    }

});

router.get('/me', auth, async(req, res) => {
    // View logged in user profile
    logger.info({
        viewsName: 'users/me',
        data: 'Request for user profile succeed'
    });
    res.send(req.user)
})

router.post('/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        logger.info({
            viewsName: 'users/me/logout',
            data: 'Request for user logout succeed'
        });
        res.send()
    } catch (error) {
        logger.info({
            viewsName: 'users/me/logout',
            data: 'Request for user logout failed'
        });
        res.status(500).send(error)
    }
})

module.exports = router