import { container } from '../system/di';
import { Database } from '../services';

export default function database(req, res, next) {
    // ensure the db connection is initialize
    const database: Database = container.get<Database>('Factory<Database>');

    if (!database.hasConnection()) {
        database.initConnection().then((): void => {
            next();
        });
    } else {
        next();
    }
};
