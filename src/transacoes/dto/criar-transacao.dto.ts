import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CriarTransacaoDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  descricao: string;

  @IsNumber()
  @Min(0.01)
  valor: number;

  @IsString()
  @IsIn(['receita', 'despesa'])
  tipo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}