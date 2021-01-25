import { AppInitialProps } from 'next/app';
import React from 'react';

export interface UserIdentity {
    id: number,
    name: string,
    email: string
};

export type IdentityProviderProps = Readonly<AppInitialProps> & {
    session: UserIdentity
};

export const IdentityContext = React.createContext<UserIdentity>(
    (null as unknown) as UserIdentity
);
