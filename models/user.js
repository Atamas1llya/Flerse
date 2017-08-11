import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true, maxlength: 255, trim: true },
  nickname: { type: String, unique: true, required: true, minlength: 1, maxlength: 30, trim: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: String,
  status: { type: String, maxlength: 150, trim: true }
})

UserSchema.pre('save', async function(next) {
  if(!this.isModified()) {
    return next();
  };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
