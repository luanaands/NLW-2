import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classes = new ClassesController();
const connections = new ConnectionsController();

routes.get('/classes', classes.index);
routes.post('/classes', classes.create);

routes.get('/connections', connections.index);
routes.post('/connections', connections.create);

export default routes;