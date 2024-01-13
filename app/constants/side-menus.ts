import { USER_ROLES } from '@app/resources/user/constants';
import { USER_ROLES_TYPE } from '@app/resources/user/types';
import { ReactNode } from 'react';

type TSidebarMenu = {
  [role in USER_ROLES_TYPE]: Array<{
    label: string;
    route: string;
    icon: ReactNode;
  }>;
};
export const SIDE_BAR_MENUS: TSidebarMenu = {
  [USER_ROLES.USER]: [{ icon: '', label: '', route: '' }],
  [USER_ROLES.ORGANIZER]: [],
  [USER_ROLES.ADMIN]: [],
  [USER_ROLES.MODERATOR]: [],
  [USER_ROLES.SPEAKER]: [],
  [USER_ROLES.SPONSOR]: [],
};
