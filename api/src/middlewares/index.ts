import nc from 'next-connect';
import systemPassport from '../system/passport';
import database from './database';
import passport from './passport';

const middleware = nc();

middleware.use(database);
middleware.use(passport(systemPassport));

export default middleware;
