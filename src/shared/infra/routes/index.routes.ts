
import cors from 'cors';
import express from 'express';
import userRouter from './users.routes';
import facilityRouter from './facilities.routes';
import MysqlDbServices from '../db/mysql/mysqlDB.services';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Ping!') });

app.get('/teste', async (req, res) => { 
    
    const conection:MysqlDbServices = new MysqlDbServices();
    conection.connect();
    const respostaConecttion = await conection.execute("SELECT * FROM tb_usuarios;");
    conection.disconnect();
    res.status(200).json({respostaConecttion});
});
app.use('/users', userRouter);
app.use('/facilities', facilityRouter);

export default app;