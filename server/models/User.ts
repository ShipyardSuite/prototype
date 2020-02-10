import mongoose = require("mongoose");
import Schema = mongoose.Schema;
import Document = mongoose.Document;

import bcrypt = require("bcrypt");

export interface IUser extends Document {
    email: String;
    password: String;
    verificationToken: String;
    isVerified: Boolean;
    isDeleted: Boolean;
    signUpDate: Date;
    generateHash(password: string): String;
    validPassword(password: string): String;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    verificationToken: { type: String },
    signUpDate: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
