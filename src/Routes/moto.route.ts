import express from 'express';
import MotorCycleController from '../Controllers/MotorCycle';

const motoRouter = express.Router();

motoRouter.post('/', (req, res, next) => new MotorCycleController(req, res, next).create());
motoRouter.get('/', (req, res, next) => new MotorCycleController(req, res, next).getAll());
motoRouter.get('/:id', (req, res, next) => new MotorCycleController(req, res, next).getById());
motoRouter.put('/:id', (req, res, next) => new MotorCycleController(req, res, next).update());
motoRouter.delete('/:id', (req, res, next) => new MotorCycleController(req, res, next).delete());

export default motoRouter;