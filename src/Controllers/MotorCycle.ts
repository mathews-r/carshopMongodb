import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorCycle from '../Services/MotorCycle';

const INVALID_MONGO_ID = 'Invalid mongo id';

export default class MotorCycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorCycle;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorCycle();
  }

  public create = async () => {
    const moto: IMotorcycle = this.req.body;

    try {
      const newMoto = await this.service.createMoto(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  };

  public getAll = async () => {
    try {
      const { message, status } = await this.service.getAll();
      return this.res.status(status).json(message);
    } catch (error) {
      this.next(error);
    }
  };

  public getById = async () => {
    const { id } = this.req.params;

    try {
      const moto = await this.service.getById(id);
      if (!moto) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(moto);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };

  public update = async () => {
    const { id } = this.req.params;

    const motoChanged = this.req.body;

    try {
      const motoUpdated = await this.service.updateMoto(id, motoChanged);
      if (!motoUpdated) {
        return this.res.status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(motoUpdated);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };

  public delete = async () => {
    const { id } = this.req.params;
    try {
      const result = await this.service.deleteMoto(id);
      if (result) {
        return this.res.status(404).json(result);
      }
      return this.res.sendStatus(204);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };
}
