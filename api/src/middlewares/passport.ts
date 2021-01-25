import cookieSession from 'cookie-session';
import redirect from 'micro-redirect';
import moment from 'moment';
import url from 'url';
import { PassportStatic } from 'passport';

const sessionName = 'one';
const sessionSecret = 'one';
const sessionMaxAge = '1 week';
const sessionMaxAgeMs = moment.duration(sessionMaxAge).milliseconds();

export default function passport(systemPassport: PassportStatic): (req, res, next) => void {
    return (req, res, next): void => {
        if (!res.redirect) {
            // patch the response object with the redirect function since passport.js requires res.redirect
            res.redirect = (location: string) => redirect(res, 302, location);
        }

        // initialize passport and authentication state
        cookieSession({
            name: sessionName,
            signed: true,
            secret: sessionSecret,
            domain: url.parse(req.url).host,
            maxAge:  sessionMaxAgeMs
        })(req, res, (): void => {
            next();
            systemPassport.initialize()(req, res, (): void => {
                systemPassport.session()(req, res, (): void => {
                    next();
                });
            });
        });
    };
}