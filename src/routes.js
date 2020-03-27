import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/**
 * Retorna todos os usuários
 */
routes.get('/', UserController.index);

/**
 * Insere um novo usuário
 */
routes.post('/user', UserController.store);

/**
 * Valida login usuário
 */
routes.post('/user/session', SessionController.store);

/**
 * Todas as rotas a partir desse ponto utilizarão esse middleware
 */
routes.use(authMiddleware);

/**
 * Atualiza dados do usuário logado
 */
routes.put('/user', UserController.update);

/**
 * Remove um usuário
 */
routes.delete('/user/:id', UserController.delete);


export default routes;
