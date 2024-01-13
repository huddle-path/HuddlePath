import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthModel from '@app/resources/auth/schema';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import NAVIGATION from '@app/constants/navigation';

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
      id: 'email-authentication',
      name: 'Login with email and password',
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
      authorize: async (credentials, req) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const auth = await AuthModel.findOne({ email });
          if (!auth) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            auth.passwordHash
          );

          if (passwordsMatch)
            return {
              ...auth,
              id: auth.id,
              email: auth.email,
            };
        }

        return null;
      },
    }),
  ],
};
