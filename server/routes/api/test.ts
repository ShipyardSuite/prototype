"use strict";

import express = require("express");
import mongoose = require("mongoose");

const serviceName: string = process.env.SERVICE_NAME || "undefined";

module.exports = (app: express.Application) => {
    app.get(`/api/${serviceName}/test`, (req, res, next) => {
        if (mongoose.connection.readyState) {
            res.json({
                success: true
            });
        } else {
            res.json({
                success: false
            });
        }
    });
};
