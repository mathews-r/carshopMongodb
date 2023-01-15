import express from 'express';
import carRouter from './car.route';
import motoRouter from './moto.route';

const routes = express.Router();

routes.use('/cars', carRouter);
routes.use('/cars', motoRouter);

export default routes;