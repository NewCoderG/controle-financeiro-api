
import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TransacoesController } from './transacoes.controller.js';
import { TransacoesService } from './transacoes.service.js';

describe('TransacoesController', () => {
  let controller: TransacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransacoesController],
      providers: [
        {
          provide: TransacoesService,
          useValue: {
            criar: vi.fn(),
            listar: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TransacoesController>(TransacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
