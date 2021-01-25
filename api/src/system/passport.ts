import passport from 'passport';
import { localStrategy } from '../passport';

passport.serializeUser((user: any, done): void => {
    console.log("passport.serializeUser: ", user);
    done(
        null,
        {
            id: user.id,
            displayName: user.name,
            username: user.email
        }
    );
});

passport.deserializeUser(async (serializedUser, done): Promise<void> => {
    console.log("passport.deserializeUser: ", serializedUser);
    if (!serializedUser) {
        return done(new Error(`User not found : ${serializedUser}`));
    }

    done(null, serializedUser);
});

passport.use(localStrategy);

export default passport;
