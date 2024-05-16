
import cors from 'cors';
import express from 'express';
import usersRouter from './users.routes';
import facilitiesRouter from './facilities.routes';
import assetsRouter from './assets.routes';
import buildingsRouter from './buildings.routes';
import campusesRouter from './campuses.routes';
import schoolsRouter from './schools.routes';
import reservationsRouter from './reservations.routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Ping!') });
app.use('/assets', assetsRouter);
app.use('/buildings', buildingsRouter);
app.use('/campuses', campusesRouter);
app.use('/facilities', facilitiesRouter);
app.use('/schools', schoolsRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);

export default app;