import express from 'express';
import carRouter from './car.route';

const routes = express.Router();

routes.use('/cars', carRouter);

export default routes;