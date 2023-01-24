const gameController = require("../controllers/game.controller")
const {authenticate} = require("../config/jwt.config")              // grabs the authentication from jwt.config to make sure user is logged in before going on

module.exports = (app) => {
    app.get(`/api/allgames`, gameController.getAllGames);
    app.post('/api/newgame', gameController.createGame);
    app.get(`/api/game/:id`, gameController.getOneGame);
    app.get('/api/yourgames/:fullName', gameController.getYourGames);
    app.put('/api/like/:id', gameController.likeGame);
    app.delete('/api/delete/:id', gameController.deleteGame);
    app.put('/api/game/:id/edit', gameController.updateGame);
}