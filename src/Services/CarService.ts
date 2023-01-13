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
}