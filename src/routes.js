const Router = require('koa-router');

const Users = require('./controllers/users');
const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');
const Client = require('./controllers/clients');

const router = new Router();

/**
 * Definição de rotas
 */
router.post('/auth', Auth.authenticate);
router.post('/usuarios', Password.encrypt, Users.createUser);
router
	.post('/clientes', Session.verify, Client.createClient)
	.put('/clientes', Session.verify, Client.editClient)
	.get('/clientes', Session.verify, Client.getClients);

module.exports = router;
