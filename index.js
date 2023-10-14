import x from "express";
import {fileURLToPath} from "url";

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers"
};
const setContentTypeJson = {
    "Content-Type": "application/json; charset=utf-8"
};
const setContentTypeText = {
    "Content-type": "text/plain; charset=UTF-8"
};
const setContentTypeHTML = {
    "Content-type": "text/html; charset=UTF-8"
};
const app = x();

app
.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  })
.get("/", (req, res) => {
    res
    .status(666)
    .set(setContentTypeJson)
    .json('{"Hello": "world"}');
})
//Task1
.all("/login/", (req, res) => {
    try {
        res
        .send("itmo370137");
    } catch (error) {
        console.error("Произошла ошибка:", error);
        res.status(600).send("Произошла ошибка");
    }
})
//Task2
.all("/sample/", (req, res) => {
    try {
        res
        .set(setContentTypeText)
        .set(CORS)
        .end(func);
    } catch (error) {
        console.error("Произошла ошибка:", error);
        res.status(500).send("Произошла ошибка");
    }
})
//Task3
.get("/promise/", (req, res) => {
    const taskCode = "function task(x) {\nreturn new Promise ( (res, rej) => {\nx < 18 ? res('yes') : rej('no')\n});\n}";
    res
    .set(setContentTypeText)
    .send(taskCode);
})
.get("/fetch/", (req, res) => {
    const __filename = fileURLToPath(import.meta.url).replace("index.js", "task3.html");
    res
    .set(setContentTypeHTML)
    .sendFile(__filename);
})
.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

function task(x) {
    return new Promise ( (res, rej) => {
        x < 18 ? res("yes") : rej("no")
    });
};