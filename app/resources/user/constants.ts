/**
 * User roles in the system.
 */
export enum USER_ROLES {
  /**
   * Regular user
   */
  USER = 'User',

  /**
   * Event sponsored
   */
  ORGANIZER = 'Organizer',

  /**
   * System administrator with full access
   */
  ADMIN = 'Admin',

  /**
   * Content moderator
   */
  MODERATOR = 'Moderator',

  /**
   * Speaker or presenter at events
   */
  SPEAKER = 'Speaker',

  /**
   * Event sponsor or supporter
   */
  SPONSOR = 'Sponsor',
}
