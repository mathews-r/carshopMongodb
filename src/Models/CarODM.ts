import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import VehicleODM from './VehicleODM';

export default class CarODM extends VehicleODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>(
      {
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        status: { type: Boolean, required: true },
        buyValue: { type: Number, required: true },
        doorsQty: { type: Number, required: true },
        seatsQty: { type: Number, required: true },
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
    super(schema, 'Car');
  }
}
