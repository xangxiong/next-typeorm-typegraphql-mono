import { interfaces } from 'inversify';
import { injectable } from 'react-inversify';
import { createConnection, getConnection, getConnectionOptions, Connection } from 'typeorm';
import { ConnectionNotFoundError } from 'typeorm/error/ConnectionNotFoundError';

@injectable()
export class Database {
    public static NAME = 'Database';
    protected connection: Connection;

    public static factory(context: interfaces.Context): Database {
        if (!context.container.isBound(this.NAME)) {
            context.container.bind<Database>(this.NAME).to(Database).inSingletonScope();
        }

        return context.container.get<Database>(this.NAME);
    }

    constructor() {

    }

    public async initConnection(): Promise<Connection> {
        if (!this.connection) {
            try {
                this.connection = getConnection();
            } catch(e) {
                if (e instanceof ConnectionNotFoundError) {
                    const options = await getConnectionOptions();
                    this.connection = await createConnection(options);
                } else {
                    throw e;
                }
            }
        }

        if (!this.connection.isConnected) {
            await this.connection.connect();
        }

        return this.connection;
    }

    public getConnection(): Connection {
        return this.connection;
    }

    public hasConnection(): boolean {
        return !!this.connection;
    }
}