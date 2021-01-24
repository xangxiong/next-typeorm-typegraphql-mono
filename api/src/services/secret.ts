import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { interfaces } from 'inversify';
import { injectable, inject } from 'react-inversify';
import { Config } from '@one/common/src/services/config';
 
@injectable()
export class Secret {
    public static NAME = 'Secret';
    protected config: Config;

    public static factory(context: interfaces.Context): Secret {
        if (!context.container.isBound(this.NAME)) {
            context.container.bind<Secret>(this.NAME).to(Secret).inSingletonScope();
        }

        return context.container.get<Secret>(this.NAME);
    }

    constructor(@inject('Factory<Config>') config: Config) {
        this.config = config;
    }

    /**
     * Get the configured Salt key used for one way encryption.  Any value encrypted using the Salt cannot be decrypted.
     */
    public getSalt(): string {
        return this.config.get('SECRET_SALT');
    }

    /**
     * Get the configured Private key used for encryption/decryption.
     */
    public getPrivateKey(): string {
        return this.config.get('SECRET_PRIVATE_KEY');
    }

    /**
     * Get the configured Public key used for encryption/decryption.
     */
    public getPublicKey(): string {
        return this.config.get('SECRET_PUBLIC_KEY');
    }

    public decrypt(data: string): string {
        let buffer = Buffer.from(data, 'base64');
        let text = crypto.privateDecrypt(this.getPrivateKey(), buffer);
        return text.toString('utf8');
    }

    public encrypt(data: string): string {
        let buffer = Buffer.from(data);
        let encrypted = crypto.publicEncrypt(this.getPublicKey(), buffer);
        return encrypted.toString('base64');
    }

    public match(data: string, encryptData: string): boolean {
        return data === this.decrypt(encryptData);
    }

    public encryptBcrypt(data: string): string {
        return bcrypt.hashSync(data, this.getSalt());
    }

    public matchBcrypt(data: string, encryptData: string): boolean {
        return bcrypt.compareSync(data, encryptData);
    }
}