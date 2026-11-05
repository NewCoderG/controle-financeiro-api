
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { TransacoesService } from './transacoes.service.js';
import { Transacao } from './schemas/transacao.schema.js';

describe('TransacoesService', () => {
  let service: TransacoesService;
  let transacaoModel: {
    find: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    transacaoModel = {
      find: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransacoesService,
        {
          provide: getModelToken(Transacao.name),
          useValue: transacaoModel,
        },
      ],
    }).compile();

    service = module.get<TransacoesService>(TransacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate financial metrics correctly', async () => {
    const transacoes = [
      { descricao: 'Salário', valor: 2000, tipo: 'receita', consumoConsciente: true },
      { descricao: 'Supermercado', valor: 500, tipo: 'despesa', consumoConsciente: true },
      { descricao: 'Compra por impulso', valor: 100, tipo: 'despesa', consumoConsciente: false },
    ];

    transacaoModel.find.mockReturnValue({
      exec: vi.fn().mockResolvedValue(transacoes),
    });

    const resultado = await service.listar();

    expect(resultado.historico).toEqual(transacoes);
    expect(resultado.metricas).toEqual({
      saldoTotal: 1400,
      totalDespesas: 600,
      totalGastoImpulso: 100,
    });
  });
});
