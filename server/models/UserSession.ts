import mongoose, { Schema, Document } from 'mongoose';

export interface IUserSession extends Document {
	userId: String;
	timeStamp: Date;
	isDeleted: Boolean;
}

const UserSessionSchema = new Schema({
	userId: { type: String },
	timestamp: { type: Date, default: Date.now() },
	isDeleted: { type: Boolean, default: false }
});

export default mongoose.model<IUserSession>('UserSession', UserSessionSchema);
