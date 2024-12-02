import mongoose from 'mongoose';

const UserDesignSchema = new mongoose.Schema({
  userId: String,
  designName: String,
  elements: [{
    type: String,
    content: String,
    position: {
      x: Number,
      y: Number
    },
    rotation: Number,
    scale: Number,
    fontSize: Number,
    fontFamily: String,
    color: String
  }],
  tshirtColor: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('UserDesign', UserDesignSchema);
