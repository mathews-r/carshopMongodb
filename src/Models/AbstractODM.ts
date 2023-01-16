import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected _model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this._model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    const vehicles = await this._model.find();
    return vehicles;
  }

  public async getById(id: string): Promise<T | null> {
    const vehicle = await this._model.findById(id);
    return vehicle;
  }

  public async update(id: string, options: Partial<T>): Promise<T | null> {
    const vehicle = await this._model.findByIdAndUpdate(id, options);
    return vehicle;
  }

  public async delete(id: string): Promise<T | null> {
    const vehicle = await this._model.findByIdAndDelete(id);
    return vehicle;
  }
}

export default AbstractODM;