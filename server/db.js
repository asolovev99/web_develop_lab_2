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
            dateOfCreation INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id)
        )`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            body TEXT NOT NULL,
            dateOfCreation INTEGER NOT NULL,
            topicId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY(userId) REFERENCES users(id),
            FOREIGN KEY(topicId) REFERENCES topics(id)
        )`);
};

const test = async (login, password) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let userExist = await db.get('SELECT EXISTS(SELECT id FROM users WHERE login = ?) as exist', login);
    //let user  = await db.get('SELECT * FROM users WHERE login = ?', login);
    if (userExist.exist) {
        //console.log(user);
    }
    else {
        await db.run(
            'INSERT INTO users (login, password) VALUES (?, ?)',
            login,
            password
        );
    }
    const result = await db.get('SELECT id FROM users WHERE login = ?', login);

    return result;
};

const addUser = async (login, password) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let userExist = await db.get('SELECT EXISTS(SELECT id FROM users WHERE login = ?) as exist', login);
    //let user  = await db.get('SELECT * FROM users WHERE login = ?', login);
    if (userExist.exist) {
        //console.log(user);
    }
    else {
        await db.run(
            'INSERT INTO users (login, password) VALUES (?, ?)',
            login,
            password
        );
    }

    await db.run(
        'INSERT INTO users (login, password) VALUES (?, ?)',
        login,
        password
    );
    const result = await db.get('SELECT id FROM users WHERE login = ?', login);

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
        'INSERT INTO tokens (token, userId) VALUES (?, ?)',
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

    const dateTime = Date.now();


    const result = await db.run(
        'INSERT INTO topics VALUES (?, ?)',
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
    getDb,
    test
}