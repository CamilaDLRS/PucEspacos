
import cors from 'cors';
import express from 'express';
import userRouter from './users.routes';
import facilityRouter from './facilities.routes';
import assetRouter from './assets.routes';
import buildingRouter from './buildings.routes';
import campusesRouter from './campuses.routes';
import schoolsRouter from './schools.routes';
import facilityTypeRouter from './facilityTypes.routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Ping!') });
app.use('/assets', assetRouter);
app.use('/buildings', buildingRouter);
app.use('/campuses', campusesRouter);
app.use('/facilities', facilityRouter);
app.use('/schools', schoolsRouter);
app.use('/users', userRouter);
app.use('/facilityTypes', facilityTypeRouter);
export default app;