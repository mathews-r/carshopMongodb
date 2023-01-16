import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotoODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>(
      {
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        status: { type: Boolean, required: true },
        buyValue: { type: Number, required: true },
        category: { type: String, required: true },
        engineCapacity: { type: Number, required: true },
      },
      {
        // https://www.mongodb.com/community/forums/t/how-to-rename-id-to-id/184632
        id: true,
        toJSON: {
          transform(_doc, ret) {
            const Ret = ret;
            Ret.id = ret._id;
            delete Ret._id;
          },
        },
      },
    );
    super(schema, 'Motorcycles');
  }
}
