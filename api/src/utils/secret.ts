import { Secret } from '../services';
import { container } from '../system/di';

export function encrypt(data: string): string {
    const secret = container.get<Secret>('Factory<Secret>');
    return secret.encrypt(data);
}

export function decrypt(data: string): string {
    const secret = container.get<Secret>('Factory<Secret>');
    return secret.decrypt(data);
}

export function encryptBcrypt(data: string): string {
    const secret = container.get<Secret>('Factory<Secret>');
    return secret.encryptBcrypt(data);
}

export function matchBcrypt(data: string, encryptData: string): boolean {
    const secret = container.get<Secret>('Factory<Secret>');
    return secret.matchBcrypt(data, encryptData);
}
