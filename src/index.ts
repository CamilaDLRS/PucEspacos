import app from "./shared/infra/rotas";

require('dotenv').config();

const porta = process.env.PORT;

try {
  app.listen(porta, () => {
    console.log(`Puc Espaços esta rodando na porta ${porta}, com o banco ${process.env.DB_HOST || ''}`);
  });

  process.on('SIGINT', () => {
    console.log('Aplicativo Puc Espaços parou por SIGINT sinal.');
    process.exit(0); 
  });

} catch (error) {
  console.log(`Errou ao inicializar o aplicativo Puc Espaços.`, error);
}

