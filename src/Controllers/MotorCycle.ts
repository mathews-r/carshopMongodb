import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorCycle from '../Services/MotorCycle';

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
}