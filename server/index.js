const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
let cookies = require("cookie-parser");
const morgan = require('morgan');
let db = require("./db");

const messagesRouter = require("./routes/messages");
const loginRouter = require("./routes/login");
const topicsRouter = require("./routes/topics");



const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.get("/user", async (req, res) => {
    console.log("GET /user");

    if (req.cookies.token !== null && req.cookies.token != undefined) {
        let user = await db.getUser(req.cookies.token);

        console.log("token:");
        console.log(req.cookies.token);
        console.log("user:");
        console.log(user);

        if (user < 0) {
            res.status(401).json({message: "Пользователь не авторизован"});    
        }
        else {
            res.status(200).json(user);
        }        
    }
    else {
        res.status(401).json({message: "Пользователь не авторизован"});
    }
});

app.post("/registration", async (req, res) => {
    console.log("POST /registration");
    console.log("login = " + req.body.login);
    console.log("password = " + req.body.password);
    console.log(req.body);
    

    if (await db.addUser(req.body.login, req.body.password) < 0) {
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }
    else {
        res.status(200).json({
            message: "Пользователь успешно добавлен"
        });
    }    
});

app.use('/topics', topicsRouter);

app.use('/login', loginRouter);

app.use('/messages', messagesRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)    
});

(async () => {
    await db.initDb();
})();