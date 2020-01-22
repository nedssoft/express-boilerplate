import express from 'express';
import { bouncer } from 'express-error-bouncer';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import fs from 'fs';
import routes from '../routes';


const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'));

app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use('/api', routes);
app.use(bouncer);

export default app;
