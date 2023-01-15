import express from 'express';
import CarController from '../Controllers/CarController';

const carRouter = express.Router();

carRouter.post('/', (req, res, next) => new CarController(req, res, next).create());
carRouter.get('/', (req, res, next) => new CarController(req, res, next).getAll());
carRouter.get('/:id', (req, res, next) => new CarController(req, res, next).getById());
carRouter.put('/:id', (req, res, next) => new CarController(req, res, next).update());

export default carRouter;