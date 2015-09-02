let tables = [
    {
        name: 'users',
        options: {
            primaryKey: 'id',
            durability: 'soft' // writes will be acknowledged by the server immediately and flushed to disk in the background.
        }
    },{
        name: 'config',
        options: {
            primaryKey: 'id',
            durability: 'soft'
        }
    },{
        name: 'servers',
        options: {
            primaryKey: 'id',
            durability: 'soft'
        }
    },{
        name: 'data',
        options: {
            primaryKey: 'id',
            durability: 'soft'
        }
    }
];

export let development = {
    host: 'localhost',
    port: 28015,
    db_name: 'health_dev',
    db_tables: tables
};

export let production = {
    host: 'localhost',
    port: 28015,
    db_name: 'health',
    db_tables: tables
};

export let test = {
    host: 'localhost',
    port: 28015,
    db_name: 'health_test',
    db_tables: tables
};