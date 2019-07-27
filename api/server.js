import express from 'express';
import { bouncer } from 'express-error-bouncer';
import cors from 'cors';
import routes from '../routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use(bouncer);

export default app;
