// import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';

// const dataCarMock: Car = new Car(
//   {
//     model: 'Marea',
//     year: 2002,
//     color: 'Black',
//     status: true,
//     buyValue: 15.990,
//     doorsQty: 4,
//     seatsQty: 5,
//   },
// );

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
}];

export { mockCarInput, mockCarOutput };