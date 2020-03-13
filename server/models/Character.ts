import mongoose = require("mongoose");
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface ICharacter extends Document {
    projectId: string;
}

const CharacterSchema: Schema = new Schema({
    projectId: { type: String, required: true }
});

export default mongoose.model<ICharacter>("Character", CharacterSchema);
