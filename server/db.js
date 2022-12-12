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



const addUser = async (login, password) => {
    console.log("addUser");

    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let userExist = await db.get('SELECT EXISTS(SELECT id FROM users WHERE login = ?) as exist', login);

    let result = -1;
    if (userExist.exist === 1) {  
        console.log("Пользователь существует");
        
        return result;
    }
    else {
        console.log("Добавление пользователя");

        result = await db.run(
            'INSERT INTO users (login, password) VALUES (?, ?)',
            login,
            password
        );        
    }
        
    return result;
};

const isUserExist = async (login, password) => {
    let result = false;

    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let userExist = await db.get('SELECT EXISTS(SELECT id FROM users WHERE login = ? and password = ?) as exist', login, password);
    if (userExist.exist === 1) {
        result = true;
    }
    else {
        result = false;
    }

    return result;
};

const getUser = async (userToken) => {
    
    let userId = -1;
    const userIdDb = await db.get('SELECT userId FROM tokens WHERE token = ?', userToken);
    if (userIdDb !== undefined && userIdDb !== null) {
        userId = userIdDb.userId;
    }

    return userId;
}

const addToken = async (token, userLogin) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = (await db.get('SELECT id FROM users WHERE login = ?', userLogin)).id;

    const result = await db.run(
        'INSERT INTO tokens (token, userId) VALUES (?, ?)',
        token,
        userId
    );

    //return result;
};

const isTokenExist = async (token) => {
    let result = false;

    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let tokenExist = (await db.get('SELECT EXISTS(SELECT id FROM tokens WHERE token = ?) as exist', token));
    if (tokenExist.exist === 1) {
        result = true;
    }
    else {
        result = false;
    }
      
    return result;
};

const deleteToken = async (token) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }    

    const result = await db.run(
        'DELETE FROM tokens WHERE token = ?',
        token
    );

    //return result;
};

const getTopics = async (find) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let result = await db.all(`
        SELECT topics.id AS id, topics.title, topics.dateOfCreation, users.id AS userId, users.login FROM topics
        JOIN users ON topics.userId = users.id
        WHERE title LIKE '%` + find + `%' 
        ORDER BY topics.dateOfCreation DESC`
        );    
        
    return result;
};

const addTopicAndMessage = async (titleOfTopic, dateTimeOfCreation, userToken, message) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = (await db.get('SELECT userId FROM tokens WHERE token = ?', userToken)).userId;

    await db.run(
        'INSERT INTO topics (title, dateOfCreation, userId) VALUES (?, ?, ?)',
        titleOfTopic,
        dateTimeOfCreation,
        userId
    );
    const topicId = (await db.get('SELECT id FROM topics WHERE title = ? AND dateOfCreation = ? AND userId = ?',
    titleOfTopic, dateTimeOfCreation, userId)).id;

    await db.run(
        'INSERT INTO messages (body, dateOfCreation, topicId, userId) VALUES (?, ?, ?, ?)',
        message,
        dateTimeOfCreation,
        topicId,
        userId
    );

    return topicId;
};

const getTopicAndMessages = async (idOfTopic) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    let result = await db.all(`
        SELECT topics.title, messages.body, messages.dateOfCreation, users.login FROM topics
        JOIN messages ON messages.topicId = topics.id
        JOIN users ON users.id = messages.userId
        WHERE topics.id = ?
        ORDER BY messages.dateOfCreation ASC`, idOfTopic
        );    
        
    return result;
};

const addMessage = async (message, dateTimeOfCreation, idOfTopic, userToken) => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    const userId = (await db.get('SELECT userId FROM tokens WHERE token = ?', userToken)).userId;

    await db.run(
        'INSERT INTO messages (body, dateOfCreation, topicId, userId) VALUES (?, ?, ?, ?)',
        message,
        dateTimeOfCreation,
        idOfTopic,
        userId
    );

    //return result;
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
    const result = await db.get('SELECT * FROM users WHERE login = ?', login);

    return result;
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb,
    test,


    addUser,
    isUserExist,
    getUser,

    addToken,
    isTokenExist,
    deleteToken,

    getTopics,
    addTopicAndMessage,

    getTopicAndMessages,
    addMessage
}