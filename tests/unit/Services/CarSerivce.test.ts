import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { carMockWithouStatus, mockCarInput, mockCarOutput } from '../mocks/mocksCar';

describe('Testes no CarService', function () {
  describe('Testes com GET na rota /cars', function () {
    it('Tem que retornar todos os carros ao fazer um GET na rota /cars', async function () {
      sinon.stub(Model, 'find').resolves(mockCarOutput);
      
      const service = new CarService();
      const result = await service.getAll();
      
      expect(result.message).to.be.deep.equal(mockCarOutput);
    });
    it('Tem que falhar fazer um GET em uma rota com id inválido', async function () {
      sinon.stub(Model, 'findById').resolves(mockCarOutput[0]);

      try {
        const service = new CarService();
        await service.getById('999');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });
  describe('Testes com POST na rota /cars', function () {
    it('Deve criar um novo carro com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(mockCarOutput[0]);

      const service = new CarService();
      const result = await service.createCar(mockCarInput);

      expect(result).to.be.deep.equal(mockCarOutput[0]);
    });
    it('Deve criar um carro se não passar o atributo status com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(mockCarOutput[0]);

      const service = new CarService();
      const result = await service.createCar(carMockWithouStatus);

      expect(result).to.be.deep.equal(mockCarOutput[0]);
    });
    it('Deve retornar null se não passar nenhum parametro', async function () {
      sinon.stub(Model, 'create').resolves(undefined);

      const service = new CarService();
      const result = await service.createCar(carMockWithouStatus);

      expect(result).to.be.deep.equal(null);
    });
  });
  describe('Testes com PUT na rota /cars', function () {
    it('Deve alterar um carro com sucesso', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCarOutput[0]);

      const service = new CarService();
      const result = await service.updateCar('1', mockCarOutput[1]);

      expect(result).to.be.deep.equal(mockCarOutput[1]);
    });
    it('Deve falhar ao tentar alterar um carro que não existe', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      try {
        const service = new CarService();
        await service.updateCar('2', mockCarOutput[1]);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Car not found');
      }
    });
  });
  describe('Testes com DELETE na rota /cars', function () {
    it('Deve deletar um carro com sucesso', async function () {
      sinon.stub(Model, 'findById').resolves(mockCarOutput[0]);
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);

      const service = new CarService();
      const result = await service.deleteCar('1');
     
      expect(result).to.be.deep.equal(null);
    });
    it('Deve retornar um erro ao tentar deletar um carro que não existe', async function () {
      sinon.stub(Model, 'findById').resolves(null);

      try {
        const service = new CarService();
        await service.deleteCar('1');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Car not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});