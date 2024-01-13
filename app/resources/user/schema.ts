import mongoose, { Schema, models, model } from 'mongoose';
import { IUser, USER_ROLE_LIST } from './types';

const Model = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    roles: {
      type: [String],
      enum: USER_ROLE_LIST,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel: mongoose.Model<IUser> =
  models?.User || model<IUser>('User', Model);

export default UserModel;
