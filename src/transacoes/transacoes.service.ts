import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transacao } from './schemas/transacao.schema.js';
import { CriarTransacaoDto } from './dto/criar-transacao.dto.js';

@Injectable()
export class TransacoesService {

  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criar(dto: CriarTransacaoDto) {
    const novaTransacao = new this.transacaoModel(dto);

    return await novaTransacao.save();
  }

  async listar() {
    const historico = await this.transacaoModel.find().exec();

    const totalReceitas = historico
      .filter(transacao => transacao.tipo === 'receita')
      .reduce((total, transacao) => total + transacao.valor, 0);

    const totalDespesas = historico
      .filter(transacao => transacao.tipo === 'despesa')
      .reduce((total, transacao) => total + transacao.valor, 0);

    const totalGastoImpulso = historico
      .filter(
        transacao =>
          transacao.tipo === 'despesa' &&
          transacao.consumoConsciente === false
      )
      .reduce((total, transacao) => total + transacao.valor, 0);

    const saldoTotal = totalReceitas - totalDespesas;

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}