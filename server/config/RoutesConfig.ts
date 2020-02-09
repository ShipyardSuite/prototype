import express = require('express');
import mongoose = require('mongoose');
import * as path from 'path';
import * as fs from 'fs';

export class RoutesConfig {
	constructor(app: express.Application) {
		require('./../routes')(app);

		// app.get('/', function(req, res) {
		// 	console.log(mongoose.connection.readyState);

		// 	res.send('test');
		// });
	}
}
