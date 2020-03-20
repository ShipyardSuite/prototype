import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IAsset extends Document {
	projectId: String;
	name: String;
	identifier: String;
}

const AssetSchema: Schema = new Schema({
	projectId: { type: String, required: true },
	name: { type: String, required: true },
	identifier: { type: String, required: true }
});

export default mongoose.model<IAsset>('Asset', AssetSchema);
