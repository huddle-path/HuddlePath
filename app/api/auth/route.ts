import AuthModel from '@app/resources/auth/schema';
import { ICredentials } from '@app/resources/auth/types';
import bcrypt from 'bcrypt';
import UserModel from '@app/resources/user/schema';
import { USER_ROLES } from '@app/resources/user/constants';

export const register = async ({ email, password }: ICredentials) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      email,
      roles: [USER_ROLES.USER, USER_ROLES.ORGANIZER],
    });

    return AuthModel.create({
      email,
      passwordHash,
      user: user._id,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async ({ email, password }: ICredentials) => {
  try {
    const auth = await AuthModel.findOne({ email });

    if (!auth) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, auth.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return auth;
  } catch (error) {
    console.error(error);
    return null;
  }
};
