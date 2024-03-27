require('dotenv').config();
import express from 'express';
import * as https from 'https';

const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => { res.send('Ping!') });

try {
  const server = https.createServer(app);

  server.listen(port, () => {
    console.log(`Puc Espaços app is running on port ${port}, database ${process.env.DB_HOST || ''}`);
  });

  process.on('SIGINT', () => {
    console.log('Puc Espaços app stopped by SIGINT signal.');
    process.exit(0); 
  });

} catch (error) {
  console.log(`Error at initiate the Puc Espaços app.`, error);
}

