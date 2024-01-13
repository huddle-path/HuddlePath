import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import AuthModel from '@app/resources/auth/schema';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const authConfig: AuthOptions = {
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
  callbacks: {
    async signIn({ credentials }) {
      console.log({ credentials });

      try {
        let auth = credentials;
        let user;

        const _profile = credentials as any;

        // const email = credentials?.email;
        // auth = await AuthModel.findOne({ email }).populate({ path: 'user' });
        // user = auth?.user;

        // if (!auth) {
        //   // Create a new user
        //   const firstName = _profile?.given_name;
        //   const lastName = _profile?.family_name;
        //   const profilePhoto = _profile?.picture;
        //   const roles = [USER_ROLES.USER];

        //   user = await UserModel.create({
        //     firstName,
        //     lastName,
        //     profilePhoto,
        //     email,
        //     roles,
        //   });

        //   auth = await AuthModel.create({
        //     email,
        //     user: user._id,
        //     roles,
        //   });
        // }

        return Promise.resolve(true);
      } catch (error) {
        console.log(error);
        return Promise.resolve(false);
      }
    },
  },
};
