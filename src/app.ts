import * as http from 'http';
import mongoose = require('mongoose');
import path from 'path';
import express = require('express');
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(String(process.env.DATABASE_URL), { useNewUrlParser: true });

const port: number = Number(process.env.SERVICE_PORT);
const app: express.Application = express();

app.get('/', function(req, res) {
	res.send(`Mongoose connection status: ${mongoose.connection.readyState ? String(true) : String(false)}`);
});

app.listen(port, function() {
	console.log(`Express server listening on port ${port.toString()}!`);
});
