import app from "./shared/infra/routes/index.routes";

const port:number = 5001;

try {
  app.listen(port, () => {
    console.log(`Puc Espaços app is running on port ${port}`);
  });

  process.on('SIGINT', () => {
    console.log('Puc Espaços app stopped by SIGINT signal.');
    process.exit(0); 
  });

} catch (error) {
  console.log(`Error at initiate the Puc Espaços app.`, error);
}