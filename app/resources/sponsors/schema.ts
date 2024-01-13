import mongoose, { Schema, model, models } from 'mongoose';
import { ISponsor } from './types';

const Model: Schema<ISponsor> = new Schema<ISponsor>(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SponsorModel: mongoose.Model<ISponsor> =
  models?.Sponsor || model<ISponsor>('Sponsor', Model);

export default SponsorModel;
