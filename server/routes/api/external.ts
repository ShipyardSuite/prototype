import express = require('express');
import mongoose = require('mongoose');

import Project, { IProject } from './../../models/Project';
import ProjectToken, { IProjectToken } from './../../models/ProjectToken';
import Player, { IPlayer } from './../../models/Player';
import MessageOfTheDay, { IMessageOfTheDay } from './../../models/MessageOfTheDay';
import Asset, { IAsset } from '../../models/Asset';

module.exports = (app: express.Application) => {
	// Get Project-info by project-token
	app.get(`/api/project/:token/info`, (req, res, next) => {
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
							data: { title: project.title, id: project._id }
						});
					}

					return res.send({
						success: false,
						message: 'ERROR: Project not found'
					});
				});
			}
		});
	});

	// Get Messages of the Day by project-token.
	app.get(`/api/project/:token/messageOfTheDay`, (req, res, next) => {
		ProjectToken.findOne({ token: req.params.token }, (err, token) => {
			if (err) {
				return res.send({
					success: false,
					message: err
				});
			}

			if (token) {
				MessageOfTheDay.find({ projectId: token.projectId }, (err, messages) => {
					if (messages) {
						return res.json({
							success: true,
							data: messages
						});
					}
				});
			}
		});
	});

	// Get Content by project-token.
	app.get(`/api/project/:token/content`, (req, res, next) => {
		ProjectToken.findOne({ token: req.params.token }, (err, token) => {
			if (err) {
				return res.send({
					success: false,
					message: err
				});
			}

			if (token) {
				Asset.find({ projectId: token.projectId }, (err, assets) => {
					if (assets) {
						return res.json({
							success: true,
							data: assets
						});
					}
				});
			}
		});
	});

	// Login Player
	app.post(`/api/player/login`, (req, res, next) => {
		const jsonData = JSON.parse(req.body.query);

		Player.findOne({ name: jsonData.playerName }, (err, player) => {
			if (player !== null) {
				// Pass player to json output
				Project.findById(jsonData.projectId, (err, project) => {
					if (project) {
						if (project.players.indexOf(player._id) > -1) {
							return res.send({
								success: true,
								data: player
							});
						} else {
							project.players.push(player._id);
							project.save((err, currentProject) => {
								return res.send({
									success: true,
									data: player
								});
							});
						}
					}
				});
			} else {
				// Create new Player
				const newPlayer = new Player();
				newPlayer.name = jsonData.playerName;
				newPlayer.save((err, player) => {
					Project.findById(jsonData.projectId, (err, project) => {
						if (project) {
							project.players.push(player._id);
							project.save((err, currentProject) => {
								return res.send({
									success: true,
									data: player
								});
							});
						}
					});
				});
			}
		});
	});

	// Update/Ping Player
	app.post(`/api/player/update`, (req, res, next) => {
		const jsonData = JSON.parse(req.body.query);

		Player.findOneAndUpdate(
			{
				_id: jsonData.playerId
			},
			{
				$set: {
					lastUpdate: new Date()
				}
			},
			{
				upsert: false,
				new: false
			},
			(err, player) => {
				if (err) {
					return res.send({
						success: false,
						message: err
					});
				}

				return res.send({
					success: true
				});
			}
		);
	});
};
