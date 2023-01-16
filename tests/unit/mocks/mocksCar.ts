import ICar from '../../../src/Interfaces/ICar';

const mockCarInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

const mockCarOutput = [{
  id: '1',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
},
{
  id: '1',
  model: 'Marea',
  year: 2002,
  color: 'Red',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
}];

const carMockWithouStatus: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export { mockCarInput, mockCarOutput, carMockWithouStatus };