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
    const motoODM = new MotoODM();
    const motoCreated = await motoODM.create({
      ...moto,
      status: moto.status || false,
    });
    return this.createMotoDomain(motoCreated);
  };

  public getAll = async () => {
    const motoODM = new MotoODM();
    const motos = await motoODM.getAll();

    return { status: 200, message: motos };
  };

  public getById = async (id: string) => {
    const motoODM = new MotoODM();
    const moto = await motoODM.getById(id);
    return moto;
  };

  public updateMoto = async (id: string, motoChanged: IMotorcycle) => {
    const motoODM = new MotoODM();
    const motoUpdated = await motoODM.update(id, motoChanged);
    
    if (!motoUpdated) {
      return null;
    }

    return {
      id,
      ...motoChanged,
    };
  };

  public deleteMoto = async (id: string) => {
    const motoODM = new MotoODM();
    const moto = await this.getById(id);
    if (!moto) return { message: 'Motorcycle not found' };

    await motoODM.delete(id);
    return null;
  };
}