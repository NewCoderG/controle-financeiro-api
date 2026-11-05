# API de Controle Financeiro Pessoal

API REST desenvolvida com **NestJS**, **TypeScript** e **MongoDB Atlas** para registrar receitas e despesas, consultar o histórico financeiro e acompanhar métricas de consumo.

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- MongoDB Atlas
- Mongoose
- class-validator

## Funcionalidades

- Cadastro de receitas e despesas.
- Consulta do histórico de transações.
- Cálculo do saldo total.
- Cálculo do total de despesas.
- Identificação de gastos por impulso.
- Validação dos dados recebidos pela API.

## Configuração do projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_string_de_conexao
```

Substitua o valor pela sua URI de conexão do MongoDB Atlas.

**Importante:** não compartilhe o arquivo `.env` nem publique suas credenciais.

### 3. Executar a aplicação

```bash
npm run start:dev
```

A API ficará disponível em:

`http://localhost:3000`

## Endpoints

### POST /transacoes

Cadastra uma nova transação.

Exemplo de requisição:

```json
{
  "descricao": "Salário",
  "valor": 2000,
  "tipo": "receita",
  "categoria": "Renda",
  "consumoConsciente": true
}
```

Os valores permitidos para `tipo` são `receita` e `despesa`.

### GET /transacoes

Retorna o histórico de transações e as métricas financeiras.

Exemplo de resposta:

```json
{
  "historico": [],
  "metricas": {
    "saldoTotal": 0,
    "totalDespesas": 0,
    "totalGastoImpulso": 0
  }
}
```

## Validações

A API utiliza `class-validator` e `ValidationPipe` para validar os dados recebidos, rejeitando informações inválidas.

## Autor

Desenvolvido como projeto acadêmico de desenvolvimento de API REST.
