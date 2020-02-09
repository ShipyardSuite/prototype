import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	email: String;
	password: String;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String }
});

UserSchema.methods.generateHash = function(password: string) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password: string) {
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
