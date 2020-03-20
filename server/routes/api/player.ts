import express = require('express');
import mongoose = require('mongoose');

import Player, { IPlayer } from './../../models/Player';

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	// Get Player info by Id.

	app.get(`/api/${serviceName}/player/:playerId`, (req, res, next) => {
		Player.findById(req.params.playerId, (err, player) => {
			if (err) {
				console.log('error:', err);
				return res.send({
					success: false,
					message: err
				});
			}

			return res.send({
				success: true,
				data: player
			});
		});
	});
};
