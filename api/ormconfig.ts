export default {
    'name': 'default',
    'type': 'sqlite',
    'database': './database.sq3',
    'synchronize': false,
    'logging': true,
    'entities': [
        'src/entities/**/*.entity.ts'
    ],
    'migrations': [
        'src/migrations/**/*.ts'
    ],
    'cli': {
        'entitiesDir': 'src/entities',
        'migrationsDir': 'src/migrations'
    }
};
