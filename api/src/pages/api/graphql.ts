import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { IncomingMessage, ServerResponse } from 'http';
import nc, { Middleware } from 'next-connect';
import { buildSchema } from 'type-graphql';
import middleware from '../../middlewares';

// disable body parse for next-js
export const config = {
    api: {
        bodyParser: false
    }
};

let apolloServerHandler: (req: any, res: any) => Promise<void>;
const getApolloServerHandler = async (): Promise<Middleware<IncomingMessage, ServerResponse>> => {
    if (!apolloServerHandler) {
        const schema = await buildSchema({
            skipCheck: true,
            validate: false,
            resolvers: [
                'src/resolvers/**/*.resolver.ts'
            ],
            emitSchemaFile: {
                path: 'schema.graphql'
            }
        });
        apolloServerHandler = new ApolloServer({
            schema,
            // NOTE: enable in dev to allow easy testing of graphql api
            playground: true
        }).createHandler({
            path: '/api/graphql'
        });
    }

    return apolloServerHandler;
};

export default async (req: IncomingMessage, res: ServerResponse) => {
    const handler = nc();
    handler.use(middleware);
    handler.use(await getApolloServerHandler());

    return handler.run(req, res);
}
