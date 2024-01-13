import { TokenActionTypes } from './constants';

export interface IToken {
  actionType: TokenActionTypes;
  id: string;
  /**
   * Default is 1d
   */
  expiresIn?: string | number;
}
