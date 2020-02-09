import express = require('express');

import { RoutesConfig, ExpressConfig, DbConfig } from './config';

export class Server {
	app: express.Application;
	port: number;
	database: string;

	constructor() {
		this.app = express();
		this.port = Number(process.env.SERVICE_PORT);
		this.database = String(process.env.DATABASE_URL);
	}

	execute() {
		new ExpressConfig(this.app);
		new RoutesConfig(this.app);
		new DbConfig(this.database);

		this.app.listen(this.port, () => {
			console.log(`=> Server listening on port ${this.port}`);
		});
	}
}

const app = new Server();

app.execute();
