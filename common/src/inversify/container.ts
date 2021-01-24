import { Container as InversifyContainer } from 'react-inversify';

export class Container extends InversifyContainer {
    public getService<T>(name: string): T {
        return this.get<T>(`Factory<${name}>`);
    }
}