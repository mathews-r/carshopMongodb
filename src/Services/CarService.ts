import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain = (car: ICar): Car | null => {
    if (car) {
      return new Car(car);
    }
    return null;
  };

  public createCar = async (car: ICar) => {
    const carODM = new CarODM();
    const carCreated = await carODM.create({ ...car, status: car.status || false });
    return this.createCarDomain(carCreated);
  };

  public getAll = async () => {
    const carODM = new CarODM();
    const cars = await carODM.getAll();

    return { status: 200, message: cars };
  };

  public getById = async (id: string) => {
    if (!isValidObjectId(id)) return { status: 422, message: 'Invalid mongo id' };
    const carODM = new CarODM();
    const car = await carODM.getById(id);

    if (!car) {
      return { status: 404, message: 'Car not found' };
    }
    return { status: 200, message: car };
  };
}