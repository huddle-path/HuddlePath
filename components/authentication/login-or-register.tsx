'use client';
import { useTranslations } from 'next-intl';
import { Input } from '@components/ui/input';
import Logo from '@components/Logo/Logo';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { useLoginOrRegister } from '@app/resources/auth/mutation';
import { useToast } from '@components/ui/use-toast';

export default function LoginOrRegister() {
  const authentication = useTranslations('authentication');
  const errors = useTranslations('errors');

  const { mutateAsync } = useLoginOrRegister();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await mutateAsync({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
      toast({
        title: authentication('welcome'),
        description: authentication('authenticationSuccessful'),
      });
    } catch (error) {
      toast({
        title: errors('error'),
        description: errors('genericError'),
        className: 'bg-white',
      });
    }
  };

  return (
    <section className='bg-huddlepath-black'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 gap-6'>
        <Logo imageClasses='w-10' textClasses='text-white font-bold text-2xl' />
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Login or Register an account
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='name@company.com'
                  required={true}
                />
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  required={true}
                />
              </div>
              <Button type='submit' className='w-full'>
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
