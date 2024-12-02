import mongoose from 'mongoose';

const PresetDesignSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  category: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('PresetDesign', PresetDesignSchema);