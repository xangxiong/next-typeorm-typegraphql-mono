import { Strategy as LocalStrategy } from 'passport-local';
import { IsNull } from 'typeorm';
import { ProviderTypes } from '@one/common/src/auth';
//import { Account } from '../entities/account.entity';

async function handler(username, password, done) {
    try {
        /*
        const account = await Account.findOne({
            where: {
                user: { email: username },
                provider: ProviderTypes.LOCAL,
                deactivateOn: IsNull()
            }
        });
        
        if (!account) {
            done(new Error('invalid account'));
            return;
        }

        if (account.matchPassword(password)) {
            console.log("matched password");
            console.log(account.user);            
            done(null, account.user);
            return;
        }
        */
        done(new Error('invalid credentials'));
    } catch(e) {
        done(e);
    }
}

// REF: https://www.npmjs.com/package/passport-local
export const localStrategy = new LocalStrategy(handler);
