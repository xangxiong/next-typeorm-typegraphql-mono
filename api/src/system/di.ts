import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import { container, changeNotification, loadServices } from '@one/common/src/system/di';
import { services } from '../configs';

export const apis = new ContainerModule(loadServices(services));
container.load(apis);

export {
    container,
    changeNotification
};
