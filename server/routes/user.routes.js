const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/register', userController.registerUser);
    app.post('/login', userController.loginUser);
    app.get('/logout', userController.logOutUser);
    //app.get(`/allusers`, userController.getAllUsers);
}