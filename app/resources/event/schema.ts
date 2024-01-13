import mongoose, { Schema, model, models } from 'mongoose';
import { IEvent } from './types';

const Model: Schema<IEvent> = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    sponsors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor',
      },
    ],
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventModel: mongoose.Model<IEvent> =
  models?.Event || model<IEvent>('Event', Model);

export default EventModel;
