import { interfaces } from 'inversify';
import { injectable } from 'react-inversify';

@injectable()
export class Config {
    public static NAME = 'Config';

    public static factory(context: interfaces.Context): Config {
        if (!context.container.isBound(this.NAME)) {
            context.container.bind<Config>(this.NAME).to(Config).inSingletonScope();
        }

        return context.container.get<Config>(this.NAME);
    }

    constructor() {
    
    }
    
    public get(field: string, defaultValue?: string): string {
        if (process.env[field] === undefined) {
            return defaultValue;
        }

        return process.env[field];
    }
}