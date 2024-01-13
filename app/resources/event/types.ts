import { ISponsor } from '../sponsors/types';
import { IUser } from '../user/types';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  sponsors: Array<ISponsor>;
  attendees: Array<IUser>;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
