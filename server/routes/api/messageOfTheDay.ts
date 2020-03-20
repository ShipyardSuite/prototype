import express = require('express');
import mongoose = require('mongoose');

import MessageOfTheDay, { IMessageOfTheDay } from './../../models/MessageOfTheDay';

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	// Get Player info by Id.

	app.post(`/api/${serviceName}/project/:projectId/messageOfTheDay`, (req, res, next) => {
		console.log(req.body.projectId);

		const newMessageOfTheDay = new MessageOfTheDay();
		newMessageOfTheDay.projectId = req.body.projectId;
		newMessageOfTheDay.title = req.body.title;
		newMessageOfTheDay.text = req.body.text;
		newMessageOfTheDay.image = req.body.image;
		newMessageOfTheDay.date = req.body.date;

		newMessageOfTheDay.save((err, message) => {
			if (err) {
				return res.send({
					success: false,
					message: err.message
				});
			}
			return res.send({
				success: true,
				data: message
			});
		});
	});

	app.get(`/api/${serviceName}/project/:projectId/messageOfTheDay`, (req, res, next) => {
		MessageOfTheDay.find({ projectId: req.params.projectId }, (err, messages) => {
			if (err) {
				console.log('error:', err);
				return res.send({
					success: false,
					message: err
				});
			}

			return res.send({
				success: true,
				data: messages
			});
		});
	});
};
