import { USER_ROLES } from '@app/resources/user/constants';
import { USER_ROLES_TYPE } from '@app/resources/user/types';
import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';
import { RiHomeSmile2Line } from 'react-icons/ri';
import NAVIGATION from './navigation';
import { RiHomeSmile2Fill } from 'react-icons/ri';
import { BsCalendar4Event } from 'react-icons/bs';
import { BsCalendar3EventFill } from 'react-icons/bs';
import { BsFillCalendar2EventFill } from "react-icons/bs";

type TSidebarMenu = {
  [role in USER_ROLES_TYPE]: Array<{
    label: string;
    route: string;
    ActiveIcon: IconType;
    InActiveIcon: IconType;
  }>;
};
export const SIDE_BAR_MENUS: TSidebarMenu = {
  [USER_ROLES.USER]: [
    {
      ActiveIcon: RiHomeSmile2Fill,
      InActiveIcon: RiHomeSmile2Line,
      label: 'dashboard',
      route: NAVIGATION.DASHBOARD,
    },
    {
      ActiveIcon: BsFillCalendar2EventFill,
      InActiveIcon: BsCalendar4Event,
      label: 'events',
      route: NAVIGATION.EVENTS,
    },
  ],
  [USER_ROLES.ORGANIZER]: [],
  [USER_ROLES.ADMIN]: [],
  [USER_ROLES.MODERATOR]: [],
  [USER_ROLES.SPEAKER]: [],
  [USER_ROLES.SPONSOR]: [],
};
