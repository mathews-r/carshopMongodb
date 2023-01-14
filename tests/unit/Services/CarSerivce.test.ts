import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { mockCarInput, mockCarOutput } from '../mocks/mocksCar';

describe('Testes no CarService', function () {
  describe('Testes com GET na rota /cars', function () {
    it('Tem que retornar todos os carros ao fazer um GET na rota /cars', async function () {
      sinon.stub(Model, 'find').resolves(mockCarOutput);
      
      const service = new CarService();
      const result = await service.getAll();
      
      expect(result.message).to.be.deep.equal(mockCarOutput);
    });
    it('Tem que falhar fazer um GET em uma rota com id inválido', async function () {
      // sinon.stub(isValidObjectId).resolves(true);
      sinon.stub(Model, 'findById').resolves(mockCarOutput[0]); // deletar essa linha 

      try {
        const service = new CarService();
        await service.getById('999');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    // it('Tem que falhar fazer um GET em uma rota sem id', async function () {
    //   sinon.stub(Model, 'findById').resolves(null);

    //   try {
    //     const service = new CarService();
    //     await service.getById('xablau');
    //   } catch (error) {
    //     expect((error as Error).message).to.be.equal('Car not found');
    //   }
    // });
  });
  describe('Testes com POST na rota /cars', function () {
    it('Deve criar um novo carro com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(mockCarOutput[0]);

      const service = new CarService();
      const result = await service.createCar(mockCarInput);

      expect(result).to.be.deep.equal(mockCarOutput[0]);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});