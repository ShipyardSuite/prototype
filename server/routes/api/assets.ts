import express = require('express');
import mongoose = require('mongoose');

import Asset, { IAsset } from './../../models/Asset';

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	app.post(`/api/${serviceName}/project/:projectId/asset`, (req, res, next) => {
		const newAsset = new Asset();

		newAsset.projectId = req.body.projectId;
		newAsset.name = req.body.name;
		newAsset.identifier = req.body.identifier;

		newAsset.save((err, asset) => {
			if (err) {
				return res.send({
					success: false,
					message: err.message
				});
			}
			return res.send({
				success: true,
				data: asset
			});
		});
	});

	app.get(`/api/${serviceName}/project/:projectId/assets`, (req, res, next) => {
		Asset.find({ projectId: req.params.projectId }, (err, assets) => {
			if (err) {
				console.log('error:', err);
				return res.send({
					success: false,
					message: err
				});
			}
			return res.send({
				success: true,
				data: assets
			});
		});
	});
};
