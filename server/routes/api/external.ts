import express = require("express");
import mongoose = require("mongoose");

import Project, { IProject } from "./../../models/Project";
import ProjectToken, { IProjectToken } from "./../../models/ProjectToken";

module.exports = (app: express.Application) => {
    // Get Project by API by token
    app.get(`/api/shipyard/:token/info`, (req, res, next) => {
        ProjectToken.findOne({ token: req.params.token }, (err, token) => {
            if (err) {
                return res.send({
                    success: false,
                    message: err
                });
            }

            if (token) {
                Project.findOne({ _id: token.projectId }, (err, project) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: err
                        });
                    }

                    if (project) {
                        return res.json({
                            success: true,
                            project: [{ title: project.title }]
                        });
                    }

                    return res.send({
                        success: false,
                        message: "ERROR: Project not found"
                    });
                });
            }
        });
    });
};
