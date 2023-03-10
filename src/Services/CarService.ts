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
    const carCreated = await carODM.create({
      ...car,
      status: car.status || false,
    });
    return this.createCarDomain(carCreated);
  };

  public getAll = async () => {
    const carODM = new CarODM();
    const cars = await carODM.getAll();

    return { status: 200, message: cars };
  };

  public getById = async (id: string) => {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    return car;
  };

  public updateCar = async (id: string, carChanged: ICar) => {
    const carODM = new CarODM();
    const carUpdated = await carODM.update(id, carChanged);
    
    if (!carUpdated) {
      return null;
    }

    return {
      id,
      ...carChanged,
    };
  };

  public deleteCar = async (id: string) => {
    const carODM = new CarODM();
    const car = await this.getById(id);
    if (!car) return { message: 'Car not found' };

    await carODM.delete(id);
    return null;
  };
}
