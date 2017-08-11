import mongoose, { Schema } from 'mongoose';

const SubscribeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  holder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


export default mongoose.model('Subscribe', SubscribeSchema);
