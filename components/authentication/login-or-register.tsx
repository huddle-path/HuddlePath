'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@components/ui/input';
import Logo from '@components/Logo/Logo';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { useLoginOrRegister } from '@app/resources/auth/mutation';
import { useToast } from '@components/ui/use-toast';
import { ICredentials } from '@app/resources/auth/types';
import { Icons } from '@components/icons/icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NAVIGATION from '@app/constants/navigation';

export default function LoginOrRegister() {
  const { push } = useRouter();
  const session = useSession();
  const authentication = useTranslations('authentication');
  const errors = useTranslations('errors');

  const loginSchema = z.object({
    email: z.string().email({ message: errors('invalidEmail') }),
    password: z.string().min(6, { message: errors('passwordMin') }),
  });

  const { mutateAsync, isLoading } = useLoginOrRegister();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ICredentials>({
    resolver: zodResolver(loginSchema),
  });

  if (session.data) {
    push(NAVIGATION.DASHBOARD);
  }

  const onSubmit = async (data: ICredentials) => {
    try {
      await mutateAsync(data);
      toast({
        title: authentication('welcome'),
        description: authentication('authenticationSuccessful'),
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: errors('error'),
        description: errors('genericError'),
        className: 'bg-white',
        duration: 2000,
      });
    }
  };

  return (
    <section className='bg-huddlepath-black text-black'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 gap-6'>
        <Logo imageClasses='w-10' textClasses='text-white font-bold text-2xl' />
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              {authentication('loginOrRegister')}
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  disabled={isLoading}
                  type='email'
                  id='email'
                  placeholder='name@company.com'
                  required={true}
                  {...register('email')}
                />
                {formErrors.email && (
                  <p className='text-red-500 text-sm'>
                    {formErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  disabled={isLoading}
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  required={true}
                  {...register('password')}
                />
                {formErrors.password && (
                  <p className='text-red-500 text-sm'>
                    {formErrors.password.message}
                  </p>
                )}
              </div>
              <Button type='submit' className='w-full' disabled={isLoading}>
                Continue {isLoading && <Icons.spinner className='ml-4' />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
