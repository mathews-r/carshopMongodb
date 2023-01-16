import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoODM from '../Models/MotoODM';

export default class MotorCycle {
  private createMotoDomain = (moto: IMotorcycle): Motorcycle | null => {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  };

  public createMoto = async (moto: IMotorcycle) => {
    const carODM = new MotoODM();
    const carCreated = await carODM.create({
      ...moto,
      status: moto.status || false,
    });
    return this.createMotoDomain(carCreated);
  };
}