import mongoose, { Schema, model, models } from 'mongoose';
import { IAuth } from './types';
import { USER_ROLES } from '../user/constants';

const Model = new Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AuthModel: mongoose.Model<IAuth> =
  models?.Auth || model<IAuth>('Auth', Model);

export default AuthModel;
