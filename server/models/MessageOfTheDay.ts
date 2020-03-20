import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import { ObjectId } from 'mongodb';

export interface IMessageOfTheDay extends Document {
	projectId: String;
	title: String;
	text: String;
	image: String;
	date: any;
}

const MessageOfTheDaySchema: Schema = new Schema({
	projectId: { type: ObjectId, required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	image: { type: String },
	date: { type: [ Date ] }
});

export default mongoose.model<IMessageOfTheDay>('MessageOfTheDay', MessageOfTheDaySchema);
