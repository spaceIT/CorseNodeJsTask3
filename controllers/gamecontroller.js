const router = require('express').Router();
const { Game } = require('../db');

router.get('/all', async (req, res) => {
    try {
        const games = await Game.findAll({ where: { owner_id: req.user.id } })

        if (!games) {
            return res
                .status(404)
                .send({ message: 'Data not found' });
        }

        res
            .status(200)
            .json({
                games: games,
                message: "Data fetched."
            });
    } catch {
        res
            .status(400)
            .send({
                message: "Data not found"
            });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const game = Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })

        if (!game) {
            return res
                .status(404)
                .send({ message: 'Data not found' });
        }

        res.status(200).json({
            game: game,
        })
    } catch {
        res
            .status(400)
            .send({ message: "Data not found." })
    }
})

router.post('/create', (req, res) => {
    try {
        const game = Game.create({
            title: req.body.game.title,
            owner_id: req.body.user.id,
            studio: req.body.game.studio,
            esrb_rating: req.body.game.esrb_rating,
            user_rating: req.body.game.user_rating,
            have_played: req.body.game.have_played
        })

        if (!game) {
            return res.status(400);
        }

        res
            .status(201)
            .json({
                game: game,
                message: "Game created"
            })
    } catch (err) {
        res
            .status(400)
            .send(err.message)
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const game = Game.update({
            title: req.body.game.title,
            studio: req.body.game.studio,
            esrb_rating: req.body.game.esrb_rating,
            user_rating: req.body.game.user_rating,
            have_played: req.body.game.have_played
        },
            {
                where: {
                    id: req.params.id,
                    owner_id: req.user.id
                }
            })

        if (!updateGame) {
            return res.status(400);
        }

        res
            .status(202)
            .json({
                game: game,
                message: "Successfully updated."
            });

    } catch (err) {
        res
            .status(400)
            .send({
                message: err.message
            })
    }
})

router.delete('/remove/:id', (req, res) => {
    try {
        const game = Game.destroy({
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        })

        if (!game) {
            return res
                .status(404)
                .send({ message: 'Game with ID not found!' });
        }

        res
            .status(204)
            .json({
                game: game,
                message: "Successfully deleted"
            })
    } catch (err) {
        res
            .status(400)
            .send({
                error: err.message
            })
    }
})

module.exports = router;