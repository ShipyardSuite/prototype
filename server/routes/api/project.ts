import express = require("express");
import mongoose = require("mongoose");

const SHA256 = require("crypto-js/sha256");

import Project, { IProject } from "./../../models/Project";
import ProjectToken, { IProjectToken } from "./../../models/ProjectToken";
import User, { IUser } from "./../../models/User";

const serviceName: string = process.env.SERVICE_NAME || "undefined";

module.exports = (app: express.Application) => {
    // Create Project-Token
    app.post(`/api/${serviceName}/project/token`, (req, res, next) => {
        const { body } = req;
        const { projectId } = body;

        const newProjectToken = new ProjectToken();
        newProjectToken.projectId = projectId;
        newProjectToken.token = SHA256(projectId).toString();

        newProjectToken.save((err, token) => {
            if (err) {
                return res.send({
                    success: false,
                    message: err.message
                });
            }
            return res.send({
                success: true,
                data: token
            });
        });
    });

    // Get Project-Token
    app.get(
        `/api/${serviceName}/project/:projectId/token`,
        (req, res, next) => {
            ProjectToken.find(
                { projectId: req.params.projectId },
                (err, token) => {
                    if (err) {
                        console.log("error:", err);
                        return res.send({
                            success: false,
                            message: err
                        });
                    }

                    return res.send({
                        success: true,
                        data: token
                    });
                }
            );
        }
    );

    // Update Token
    app.put(`/api/${serviceName}/project/token`, (req, res, next) => {
        const { body } = req;
        const { projectId } = body;

        const newToken = SHA256(Date.now()).toString();

        ProjectToken.findOneAndUpdate(
            {
                projectId: projectId
            },
            {
                $set: {
                    token: newToken
                }
            },
            {
                upsert: false,
                new: false
            },
            (err, token) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: err
                    });
                }

                return res.send({
                    success: true,
                    data: token
                });
            }
        );
    });

    // Create new Project
    app.post(`/api/${serviceName}/project/create`, (req, res, next) => {
        const { body } = req;
        const { creator, title } = body;

        const newProject = new Project();
        newProject.title = title;
        newProject.creatorId = creator;
        //newProject.token = SHA256(title).toString();
        newProject.team.push(creator);

        newProject.save((err, project) => {
            if (err) {
                return res.send({
                    success: false,
                    message: err.message
                });
            }
            return res.send({
                success: true,
                data: {
                    project: project
                }
            });
        });
    });

    // Get Project
    app.get(`/api/${serviceName}/project/:projectId`, (req, res, next) => {
        Project.findById(req.params.projectId, (err, project: any) => {
            if (err) {
                console.log("error:", err);
                return res.send({
                    success: false,
                    message: err
                });
            }

            return res.send({
                success: true,
                project
            });
        });
    });

    // Delete Project
    app.delete(`/api/${serviceName}/project/delete`, (req, res, next) => {
        const { body } = req;
        const { id } = body;

        Project.findOneAndRemove(id, (err, project) => {
            if (err) {
                console.log("error:", err);
                return res.send({
                    success: false,
                    message: err
                });
            }

            return res.send({
                success: true
            });
        });
    });

    // Get all Projects
    app.get(`/api/${serviceName}/projects/`, (req, res, next) => {
        Project.find((err, projects) => {
            if (err) {
                console.log("error:", err);
                return res.send({
                    success: false,
                    message: err
                });
            }

            return res.send({
                success: true,
                projects
            });
        });
    });

    // Get all Projects by User
    app.get(`/api/${serviceName}/:userId/projects/`, (req, res, next) => {
        Project.find({ creatorId: req.params.userId }, (err, projects) => {
            if (err) {
                console.log("error:", err);
                return res.send({
                    success: false,
                    message: err
                });
            }

            return res.send({
                success: true,
                projects
            });
        });
    });
};
