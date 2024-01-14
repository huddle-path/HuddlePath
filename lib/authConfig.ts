import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthModel from '@app/resources/auth/schema';
import { z } from 'zod';
import NAVIGATION from '@app/constants/navigation';
import { login, register } from '@app/api/auth/route';

export const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: NAVIGATION.SIGN_IN,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'myemail@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          const validationErrors = parsedCredentials.error.issues.map(
            (issue) => ({
              path: issue.path.join('.'),
              message: issue.message,
            })
          );

          return null;
        }

        const auth = await AuthModel.findOne({
          email: parsedCredentials.data.email,
        });

        if (!auth) {
          const registerAuth = await register(parsedCredentials.data);

          if (!registerAuth) return null;

          return {
            ...registerAuth,
            email: registerAuth.email,
            id: registerAuth._id,
          };
        }

        const loginAuth = await login(parsedCredentials.data);

        if (!loginAuth) return null;

        return {
          ...loginAuth,
          email: loginAuth.email,
          id: loginAuth._id,
        };

        return null;
      },
    }),
  ],
};
