import express = require("express");
import * as path from "path";
import * as fs from "fs";

export class RoutesConfig {
    constructor(app: express.Application) {
        require("./../routes")(app);

        app.get("*", function(req, res) {
            const content = fs
                .readFileSync(
                    path.resolve(__dirname, "./../../public/index.html")
                )
                .toString();

            res.set("content-type", "text/html");
            res.send(content);
            res.end();
        });
    }
}
