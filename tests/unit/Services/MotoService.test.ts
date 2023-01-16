import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorCycle from '../../../src/Services/MotorCycle';
import { mockMotoInput, mockMotoOutput, motoMockWithouStatus } from '../mocks/mocksMoto';

describe('Testes no MotoService', function () {
  // describe('Testes com GET na rota /motorcycles', function () {
  //   it('Tem que retornar todos os carros ao fazer um GET na rota /motorcycles', async function () {
  //     sinon.stub(Model, 'find').resolves(mockMotoOutput);
      
  //     const service = new MotorCycle();
  //     const result = await service.getAll();
      
  //     expect(result.message).to.be.deep.equal(mockMotoOutput);
  //   });
  //   it('Tem que falhar fazer um GET em uma rota com id inválido', async function () {
  //     sinon.stub(Model, 'findById').resolves(mockMotoOutput[0]);

  //     try {
  //       const service = new MotorCycle();
  //       await service.getById('999');
  //     } catch (error) {
  //       expect((error as Error).message).to.be.equal('Invalid mongo id');
  //     }
  //   });
  // });
  describe('Testes com POST na rota /cars', function () {
    it('Deve criar um novo carro com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(mockMotoOutput[0]);

      const service = new MotorCycle();
      const result = await service.createMoto(mockMotoInput);

      expect(result).to.be.deep.equal(mockMotoOutput[0]);
    });
    it('Deve criar um novo carro com sucesso com o status false', async function () {
      sinon.stub(Model, 'create').resolves(mockMotoOutput[0]);

      const service = new MotorCycle();
      const result = await service.createMoto(motoMockWithouStatus);

      expect(result).to.be.deep.equal(mockMotoOutput[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});