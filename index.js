import dd from 'debug';
import server from './api/server';

const debug = dd('App');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  debug(`server live at localhost:${PORT}`);
});
