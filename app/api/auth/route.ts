import { apiResponse } from '@app/handlers/api-response/response-handler';
import withDbConnection from '@app/HOFs/server/withDbConnection';
import AuthModel from '@app/resources/auth/schema';
import { ICredentials } from '@app/resources/auth/types';
import { NextRequest } from '@next';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import UserModel from '@app/resources/user/schema';
import { USER_ROLES } from '@app/resources/user/constants';
import { createToken } from '@app/handlers/token/handlers';
import { TokenActionTypes } from '@app/handlers/token/constants';
import { z } from 'zod';

const handleAuthentication = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  if (!parsedCredentials.success) {
    const validationErrors = parsedCredentials.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    return apiResponse({
      status: 400,
      message: 'BAD_REQUEST',
      data: validationErrors,
    });
  }

  const auth = await AuthModel.findOne({ email: data.email });

  if (!auth) {
    return register(data);
  }

  return login(data);
};

export const POST = withDbConnection(handleAuthentication);

const register = async ({ email, password }: ICredentials) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      email,
      roles: [USER_ROLES.USER],
    });

    // Create auth
    const auth = await AuthModel.create({
      email,
      passwordHash,
      user: user._id,
    });

    const token = createToken({
      actionType: TokenActionTypes.AccessToken,
      id: auth._id,
    });

    const response = apiResponse({ status: 200, message: 'OK' });
    response.cookies.set('x-access-token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      secure: true,
      sameSite: 'strict',
      priority: 'high',
    });

    return response;
  } catch (error) {
    console.error(error);
    return apiResponse({ status: 500, message: 'SERVER_ERROR' });
  }
};

const login = async ({ email, password }: ICredentials) => {
  try {
    const auth = await AuthModel.findOne({ email }).populate('user');
    if (!auth) {
      return apiResponse({ status: 401, message: 'AUTHENTICATION_FAILED' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, auth.passwordHash);
    if (!isPasswordValid) {
      return apiResponse({ status: 401, message: 'INVALID_CREDENTIAL' });
    }

    // Create token
    const token = createToken({
      actionType: TokenActionTypes.AccessToken,
      id: auth._id,
    });

    // Set cookie and return response
    const response = apiResponse({
      status: 200,
      message: 'SUCCESS',
      data: { user: auth.user },
    });
    response.cookies.set('x-access-token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      secure: true,
      sameSite: 'strict',
      priority: 'high',
    });

    return response;
  } catch (error) {
    console.error(error);
    return apiResponse({ status: 500, message: 'SERVER_ERROR' });
  }
};
