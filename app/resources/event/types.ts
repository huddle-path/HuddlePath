import { IQuery } from '@app/handlers/api-response/types';
import { ISponsor } from '../sponsors/types';
import { IUser } from '../user/types';

export interface IEvent {
  _id: string;
  createdAt: string;
  updatedAt: string;
  sponsors: Array<ISponsor>;
  attendees: Array<IUser>;
  createdBy: IUser;

  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  tag: 'Conference';
}

export type TUpsertEvent = Omit<
  IEvent,
  'attendees' | 'createdAt' | 'updatedAt' | 'sponsors' | '_id' | 'createdBy'
>;

export type TEventQuery = Partial<
  IQuery<Omit<IEvent, 'sponsors' | 'attendees'>>
>;
