const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../db');

router.post('/signup', async (req, res) => {
    try {
        const user = await User.create({
            full_name: req.body.user.full_name,
            username: req.body.user.username,
            passwordhash: bcrypt.hashSync(req.body.user.password, 10),
            email: req.body.user.email,
        })

        if (!user) {
            return res.status(400)
        }

        const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });

        delete user?.dataValues?.passwordHash;
        delete user?._previousdataValues?.passwordHash;

        res
            .status(200)
            .json({
                user: user,
                token: token,
            })
    } catch (err) {
        res
            .status(400)
            .send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.user.username } })

        if (!user) {
            return res
                .status(404)
                .send({ message: 'User not found' });
        }

        const matches = await bcrypt.compare(req.body.user.password, user.passwordHash)

        if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });

            delete user?.dataValues?.passwordHash;
            delete user?._previousdataValues?.passwordHash;

            res.json({
                user: user,
                message: "Successfully authenticated.",
                sessionToken: token
            });
        } else {
            res
                .status(401)
                .send({ error: 'Passwords do not match.' });
        }

    } catch (err) {
        res
            .status(400)
            .send({ error: "User not found." })
    }
})

module.exports = router;