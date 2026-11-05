import { Controller, Post, Body, Get } from '@nestjs/common';

import { TransacoesService } from './transacoes.service.js';
import { CriarTransacaoDto } from './dto/criar-transacao.dto.js';

@Controller('transacoes')
export class TransacoesController {

  constructor(
    private readonly transacoesService: TransacoesService,
  ) {}

  @Post()
  async criar(@Body() dto: CriarTransacaoDto) {
    return await this.transacoesService.criar(dto);
  }

  @Get()
  async listar() {
    return await this.transacoesService.listar();
  }
}