import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import { ObjectId } from 'mongodb';

export interface IPlayer extends Document {
	name: String;
	lastUpdate: Date;
	points: Number;
}

const PlayerSchema: Schema = new Schema({
	name: { type: String, required: true },
	lastUpdate: { type: Date },
	points: { type: Number, default: 0 }
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
