import express from "express";
import bodyParser from "body-parser";
import { createReadStream } from "fs";
import crypto from "crypto";
import http from "http";

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "x-test,Content-Type,Accept,Access-Control-Allow-Headers"
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

export default function createApp() {
    const app = express();
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.set(CORS);
        next();
    });

    app.get("/login/", (req, res) => {
        res.send("itmo370137");
    });

    app.get("/code/", (req, res) => {
        const currentFile = import.meta.url.substring(8);

        const codeStream = createReadStream(currentFile);
        codeStream.pipe(res);
    });

    app.get("/sha1/:input/", (req, res) => {
        const input = req.params.input;
        const hash = crypto.createHash("sha1").update(input).digest("hex");
        res.send(hash);
    });

    app.all("/req/", (req, res) => {
        const address = req.query.addr || req.body.addr;
        http.get(address, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.send(data);
            });
        });
    });

    app.all("*", (req, res) => {
        res.send("itmo370137");
    });

    return app;
};  