import * as http from 'http';
import path from 'path';
import express = require('express');
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });

const port: number = Number(process.env.PORT) || 3000;
const helloString: string = 'Hello World!';

const app: express.Application = express();

app.get(`/api/:token/status/`, (req, res, next) => {
	res.json({
		success: true,
		data: {
			token: req.params.token,
			projectTitle: 'TestProject',
			messageOfTheDay: {
				header: 'TestMessage',
				body: 'This is a test message'
			},
			user: {
				username: 'testUser'
			},
			content: {
				characters: [
					{
						id: 0,
						name: 'Rick',
						class: 'sorcerer'
					},
					{
						id: 1,
						name: 'Tony',
						class: 'scientist'
					}
				],
				weapons: [
					{
						id: 0,
						name: 'weapon 1',
						damage: 3
					},
					{
						id: 1,
						name: 'weapon 2',
						damage: 1
					}
				]
			}
		}
	});
});

app.listen(port, function() {
	console.log(`Express server listening on port ${port.toString()}!`);
});
