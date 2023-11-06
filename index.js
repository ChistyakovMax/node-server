import express from "express";
import bodyParser from "body-parser";
import { createReadStream } from "fs";
import crypto from "crypto";
import http from "http";
import createApp from "./app.js";

//Task5
const app = createApp(express, bodyParser, createReadStream, crypto, http);

app
    .use(bodyParser.text())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'x-test, Content-Type, Accept, Access-Control-Allow-Headers');
        next();
    })
    .get("/", (req, res) => {
        res
            .status(666)
            .set(setContentTypeJson)
            .json('{"Hello": "world"}');
    })
    //Task1
    .all("/mylogin/", (req, res) => {
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
        //const __filename = fileURLToPath(import.meta.url).replace("index.js", "task3.html");
        res
            .set(setContentTypeHTML)
            .sendFile(__filename);
    })
    //Task4
    .post("/result4/", (req, res) => {
        const x_res = req.header('x-test')
        const jsonRes = {
            "message": "itmo370137",
            "x-result": req.header('x-test'),
            "x-body": req.body
        };
        res
            .set(setContentTypeJson)
            .set(CORS)
            .json(jsonRes);
    })

    .listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });

function task(x) {
    return new Promise((res, rej) => {
        x < 18 ? res("yes") : rej("no")
    });
};
