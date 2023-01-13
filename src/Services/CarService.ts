import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public createCar = async (car: ICar) => {
    const carODM = new CarODM();
    return carODM.create(car);
  };
}