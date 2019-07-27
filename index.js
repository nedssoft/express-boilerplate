import dd from 'debug';
import dotenv from 'dotenv';
import server from './api/server';

dotenv.config();
const debug = dd('App');

console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  debug(`server live at localhost:${PORT}`);
});
