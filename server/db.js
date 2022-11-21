const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            password TEXT NOT NULL
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id)            
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            dateOfCreation TEXT NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(authorId) REFERENCES users(id)
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            body TEXT NOT NULL,
            dateOfCreation TEXT NOT NULL,
            topicId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(topicId) REFERENCES topics(id)
        )`);
};

const addUser = async (login, password) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const result = await db.run(
        'INSERT INTO users VALUES (?, ?)',
        login,
        password
    )

    return result;
};

const addToken = async (token, userLogin) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = await db.get('SELECT id FROM users WHERE login = ?', userLogin);

    const result = await db.run(
        'INSERT INTO tokens VALUES (?, ?)',
        token,
        userId
    );

    return result;
};

const addTopic = async (bodyOfTopic, dateTimeOfCreation, userLogin) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = await db.get('SELECT id FROM users WHERE login = ?', userLogin);

    const dateTimeString = dateTimeOfCreation.getFullYear().toString() + "." +
        (dateTimeOfCreation.getMonth() + 1).toString() + "." +
        dateTimeOfCreation.getDate().toString() + " " +
        dateTimeOfCreation.getHours().toString() + ":" +
        dateTimeOfCreation.getMinutes().toString() + ":" +
        dateTimeOfCreation.getSeconds().toString() + ".";


    const result = await db.run(
        'INSERT INTO tokens VALUES (?, ?)',
        bodyOfTopic,
        dateTimeString,
        userId
    );

    return result;
};

const addMessages = async (bodyOfMessage, dateTimeOfCreation, userLogin, bodyOfTopic) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = await db.get('SELECT id FROM users WHERE login = ?', userLogin);

    const dateTimeString = dateTimeOfCreation.getFullYear().toString() + "." +
        (dateTimeOfCreation.getMonth() + 1).toString() + "." +
        dateTimeOfCreation.getDate().toString() + " " +
        dateTimeOfCreation.getHours().toString() + ":" +
        dateTimeOfCreation.getMinutes().toString() + ":" +
        dateTimeOfCreation.getSeconds().toString() + ".";


    const result = await db.run(
        'INSERT INTO tokens VALUES (?, ?)',
        bodyOfTopic,
        dateTimeString,
        userId
    );

    return result;
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}