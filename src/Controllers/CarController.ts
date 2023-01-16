import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

const INVALID_MONGO_ID = 'Invalid mongo id';
export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public create = async () => {
    const car: ICar = this.req.body;
    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
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
      const car = await this.service.getById(id);
      if (!car) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };

  public update = async () => {
    const { id } = this.req.params;

    const carChanged = this.req.body;

    try {
      const carUpdated = await this.service.updateCar(id, carChanged);
      if (!carUpdated) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(carUpdated);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };

  public delete = async () => {
    const { id } = this.req.params;
    try {
      const result = await this.service.deleteCar(id);
      if (result) {
        return this.res.status(404).json(result);
      }
      return this.res.sendStatus(204);
    } catch (error) {
      return this.res.status(422).json({ message: INVALID_MONGO_ID });
    }
  };
}
