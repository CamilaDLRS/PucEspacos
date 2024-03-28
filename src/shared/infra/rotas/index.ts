
import cors from 'cors';
import express from 'express';
import usuarioRoteador from './usarios.rotas';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('Ping!') });
app.use('/usuarios', usuarioRoteador);

export default app;