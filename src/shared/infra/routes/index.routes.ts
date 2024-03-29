
import cors from 'cors';
import express from 'express';
import userRouter from './users.routes';
import facilityRouter from './facilities.routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Ping!') });
app.use('/users', userRouter);
app.use('/facilities', facilityRouter);

export default app;