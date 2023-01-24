const Game = require('../models/game.model');

module.exports = {

    createGame:(req,res) => {        // add a new game
        Game.create(req.body)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({err})
            })
    },

    getAllGames:(req,res) => {            // gets all games
        Game.find({})
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({err})   
            })
    },

    getOneGame:(req,res) => {           // get just one game by id
        Game.findById(req.params.id)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(400).json({err})
            })
    },

    getYourGames:(req,res) => {         // gets games uploaded by logged in user
        Game.find({uploadedBy:req.params.fullName})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(400).json({err})
        })
    },

    likeGame:(req,res) => {
        Game.findOneAndUpdate({_id: req.params.id, new:true}, {$inc:{likes:1}})
        .then((likedGame) => {
            res.json({likedGame})
        })
        .catch((err) => {
            res.status(400).json({err})
        })
    },

    deleteGame:(req,res) => {
        Game.deleteOne({_id: req.params.id})
        .then((deleteConfirm) => {
            res.json(deleteConfirm)
        })
        .catch((err) => {
            res.status(400).json({err})
        })
    },

    updateGame:(req,res) => {
        Game.findOneAndUpdate({ _id: req.params.id}, req.body, {new:true, runValidators:true})
        .then((updatedGame) => {
            res.json({updatedGame})
        })
        .catch((err) => {
            res.status(400).json({err})
        })
    }
}