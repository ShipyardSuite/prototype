import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IAssetTemplate extends Document {
	assetId: String;
}

const AssetTemplateSchema: Schema = new Schema({
	assetId: { type: String, required: true }
});

export default mongoose.model<IAssetTemplate>('AssetTemplate', AssetTemplateSchema);
