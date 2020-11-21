const Router = require('koa-router');

const Users = require('./controllers/users');
const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');

const router = new Router();

/**
 * Definição de rotas
 */
router.post('/auth', Auth.authenticate);
router.post('/usuarios', Password.encrypt, Users.createUser);

module.exports = router;
