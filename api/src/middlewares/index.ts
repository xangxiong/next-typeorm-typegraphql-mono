import nc from 'next-connect';
import database from './database';

const middleware = nc();

middleware.use(database);

export default middleware;
