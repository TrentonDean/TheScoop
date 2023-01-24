const gameController = require("../controllers/game.controller")
const {authenticate} = require("../config/jwt.config")              // grabs the authentication from jwt.config to make sure user is logged in before going on

module.exports = (app) => {
    app.get(`/allgames`, gameController.getAllGames);
    app.post('/newgame', gameController.createGame);
    app.get(`/game/:id`, gameController.getOneGame);
    app.get('/yourgames/:fullName', gameController.getYourGames);
    app.put('/like/:id', gameController.likeGame);
    app.delete('/delete/:id', gameController.deleteGame);
    app.put('/game/:id/edit', gameController.updateGame);
}