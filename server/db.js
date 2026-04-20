import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: "127.0.0.1",
    port: 3307,
    user: "tasks_user",
    password: "tasks123",
    database: "tasksdb",
});
