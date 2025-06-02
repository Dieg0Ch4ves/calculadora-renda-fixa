# Calculadora de Renda Fixa

Uma calculadora completa para simular investimentos em produtos de renda fixa como CDB, LCI, LCA, Tesouro Selic, Tesouro IPCA e Poupança. O projeto permite comparar diferentes produtos, visualizar gráficos de evolução e entender a rentabilidade líquida considerando impostos.

## Funcionalidades

- Simulação de investimentos em diversos produtos de renda fixa.
- Cálculo automático de impostos (IR) conforme o prazo.
- Gráfico de evolução do investimento ao longo do tempo.
- Atualização automática das taxas (CDI, Selic, IPCA) via API.
- Interface responsiva e amigável.

## Tecnologias Utilizadas

- **React** (Vite)
- **TypeScript**
- **Material UI** (MUI)
- **Recharts** (gráficos)
- **Vitest** e **Testing Library** (testes)
- **Axios** (requisições HTTP)

## Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/calculadora-renda-fixa.git
   cd calculadora-renda-fixa
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Rode o projeto:**

   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## Rodando os testes

Execute todos os testes unitários com:

```bash
npm run test
```

## Estrutura de Pastas

```
src/
  components/        # Componentes React reutilizáveis
  utils/             # Funções utilitárias e cálculos financeiros
  __tests__/         # Testes unitários
  App.tsx            # Componente principal
```

## API de Taxas

As taxas de referência são buscadas automaticamente da [BrasilAPI](https://brasilapi.com.br/api/taxas/v1).

## Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para abrir issues e sugerir melhorias.

## Licença

MIT

---

Feito com 💙 por Diego.
