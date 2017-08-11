import mongoose, { Schema } from 'mongoose';

const StorySchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  preview: { type: String },
  body: { type: String, required: true },
  date: { type: Number, default: Date.now() },
  published: { type: Boolean, default: false },
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Story', StorySchema);
