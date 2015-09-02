let tables = [
    {
        name: 'User',
        options: {
            primaryKey: 'id',
            durability: 'soft' // writes will be acknowledged by the server immediately and flushed to disk in the background.
        }
    },{
        name: 'Config',
        options: {
            primaryKey: 'id',
            durability: 'soft'
        }
    },{
        name: 'Server',
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