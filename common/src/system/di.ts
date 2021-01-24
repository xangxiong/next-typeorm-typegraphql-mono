import 'reflect-metadata';
import { BindingScopeEnum, ContainerModule, interfaces } from 'inversify';
import { ChangeNotification } from 'react-inversify';
import { Container } from '../inversify';
import { services } from '../configs';

export function loadServices(services: any): interfaces.ContainerModuleCallBack {
    return (bind: interfaces.Bind, unbind: interfaces.Unbind): void => {
        for (let name in services) {
            let loader = services[name];

            bind<interfaces.Factory<any>>(`Factory<${name}>`)
            .toFactory<any>((context: interfaces.Context): any => {
                let module = loader();
                if (module[name] && module[name].factory instanceof Function) {
                    return module[name].factory(context);
                }

                return null;
            });
        }
    };
}

export const commons = new ContainerModule(loadServices(services));
export const container = new Container({
    defaultScope: BindingScopeEnum.Request
});
export const changeNotification = new ChangeNotification();

container.load(commons);
