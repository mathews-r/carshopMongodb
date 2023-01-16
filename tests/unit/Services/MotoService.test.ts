import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorCycle from '../../../src/Services/MotorCycle';
import { mockMotoInput, mockMotoOutput, motoMockWithouStatus } from '../mocks/mocksMoto';

describe('Testes no MotoService', function () {
  describe('Testes com GET na rota /motorcycles', function () {
    it('Tem que retornar todos as motos ao fazer um GET na rota /motorcycles', async function () {
      sinon.stub(Model, 'find').resolves(mockMotoOutput);
      
      const service = new MotorCycle();
      const result = await service.getAll();
      
      expect(result.message).to.be.deep.equal(mockMotoOutput);
    });
    it('Tem que falhar fazer um GET em uma rota com id inválido', async function () {
      sinon.stub(Model, 'findById').resolves(mockMotoOutput[0]);

      try {
        const service = new MotorCycle();
        await service.getById('999');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });
  });
  describe('Testes com POST na rota /motorcycles', function () {
    it('Deve criar uma nova moto com sucesso', async function () {
      sinon.stub(Model, 'create').resolves(mockMotoOutput[0]);

      const service = new MotorCycle();
      const result = await service.createMoto(mockMotoInput);

      expect(result).to.be.deep.equal(mockMotoOutput[0]);
    });
    it('Deve criar uma nova moto com sucesso com o status false', async function () {
      sinon.stub(Model, 'create').resolves(mockMotoOutput[0]);

      const service = new MotorCycle();
      const result = await service.createMoto(motoMockWithouStatus);

      expect(result).to.be.deep.equal(mockMotoOutput[0]);
    });
    it('Deve retornar null se não passar nenhum parametro', async function () {
      sinon.stub(Model, 'create').resolves(undefined);

      const service = new MotorCycle();
      const result = await service.createMoto(motoMockWithouStatus);

      expect(result).to.be.deep.equal(null);
    });
  });
  describe('Testes com PUT na rota /motorcycles', function () {
    it('Deve alterar uma moto com sucesso', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mockMotoOutput[0]);

      const service = new MotorCycle();
      const result = await service.updateMoto('1', mockMotoOutput[1]);

      expect(result).to.be.deep.equal(mockMotoOutput[1]);
    });
    it('Deve falhar ao tentar alterar uma moto que não existe', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      try {
        const service = new MotorCycle();
        await service.updateMoto('2', mockMotoOutput[1]);
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});