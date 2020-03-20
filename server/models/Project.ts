import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import { ObjectId } from 'mongodb';

export interface IProject extends Document {
	title: String;
	creatorId: String;
	team: Array<String>;
	players: Array<String>;
}

const ProjectSchema: Schema = new Schema({
	title: { type: String, unique: true, required: true },
	creatorId: { type: String },
	team: [ { type: ObjectId } ],
	players: [ { type: ObjectId } ]
});

export default mongoose.model<IProject>('Project', ProjectSchema);
