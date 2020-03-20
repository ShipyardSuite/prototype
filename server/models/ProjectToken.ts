import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import { ObjectId } from 'mongodb';

export interface IProjectToken extends Document {
	projectId: String;
	token: String;
	timeStamp: Date;
	isDeleted: Boolean;
}

const ProjectTokenSchema = new Schema({
	projectId: { type: ObjectId, required: true },
	token: { type: String, required: true },
	timestamp: { type: Date, default: Date.now() },
	isDeleted: { type: Boolean, default: false }
});

export default mongoose.model<IProjectToken>('ProjectToken', ProjectTokenSchema);
