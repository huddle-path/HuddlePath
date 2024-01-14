'use client';
import withAuth from '@app/HOFs/client/withAuth';
import NAVIGATION from '@app/constants/navigation';
import { useCreateEvent } from '@app/resources/event/mutation';
import { TUpsertEvent } from '@app/resources/event/types';
import AppHeader from '@components/general/AppHeader';
import { Button } from '@components/ui/button';
import DatePicker from '@components/ui/datepicker';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { toast } from '@components/ui/use-toast';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateEvent = () => {
  const { push } = useRouter();
  const t = useTranslations('general');
  const translationErrors = useTranslations('errors');
  const [imagePreview, setImagePreview] = useState<string>();
  const [imageSelected, setImageSelected] = useState<boolean>(true);
  const [dateSelected, setDateSelected] = useState<boolean>(true);
  const { mutateAsync: createEvent } = useCreateEvent();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TUpsertEvent>();

  const onSubmit = async (data: TUpsertEvent) => {
    if (!data.imageUrl) {
      setImageSelected(false);

      return;
    } else {
      setImageSelected(true);
    }

    if (!data.date) {
      setDateSelected(false);

      return;
    } else {
      setDateSelected(true);
    }

    try {
      await createEvent({ ...data, tag: 'Conference' });

      toast({
        title: t('savedSuccessfully'),
        description: t('eventSavedSuccessfully'),
        duration: 1000,
      });

      push(NAVIGATION.DASHBOARD);
    } catch (error) {
      toast({
        title: translationErrors('error'),
        description: translationErrors('genericError'),
        className: 'bg-white',
        duration: 2000,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event?.target?.result as string;
        setImagePreview(result);
        setValue('imageUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='h-full w-full bg-huddlepath-gray'>
      <AppHeader />

      <div className='container mx-auto p-4 h-full max-w-screen-md'>
        <h1 className='text-2xl lg:text-4xl font-bold mb-4'>
          {t('createEvent')}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Title Field */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='title' className='font-semibold text-gray-700'>
              {t('eventTitle')}
            </label>
            <Input
              {...register('title', { required: t('titleRequired') })}
              id='title'
            />
            {errors.title && (
              <p className='text-red-500 text-sm'>{errors.title.message}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='description'
              className='font-semibold text-gray-700'
            >
              {t('eventDescription')}
            </label>
            <Textarea
              {...register('description', {
                required: t('descriptionRequired'),
              })}
              id='description'
            />
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='date' className='font-semibold text-gray-700'>
              {t('eventDate')}
            </label>
            <DatePicker
              control={control}
              name='date'
              placeholder={t('selectDate')}
              min={new Date()}
            />
            {!dateSelected && (
              <p className='text-red-500 text-sm'>{t('dateRequired')}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='location' className='font-semibold text-gray-700'>
              {t('eventLocation')}
            </label>
            <Input
              {...register('location', { required: t('locationRequired') })}
              id='location'
            />
            {errors.location && (
              <p className='text-red-500 text-sm'>{errors.location.message}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <p className='font-semibold text-gray-700'>{t('imageUpload')}</p>
            <label
              htmlFor='imageUpload'
              className='relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
            >
              {!imagePreview && (
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    className='w-8 h-8 mb-4 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 16'
                  ></svg>
                  <p className='mb-2 text-sm text-gray-500'>
                    <span className='font-semibold'>{t('clickToUpload')}</span>{' '}
                    {t('orDragNDrop')}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {t('fileUploadConstraintText')}
                  </p>
                </div>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt='Uploaded Event'
                  className='w-full h-full object-cover rounded-lg'
                />
              )}
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>
            {!imageSelected && (
              <p className='text-red-500 text-sm'>{t('imageIsRequired')}</p>
            )}
          </div>

          <Button type='submit' variant='default' className='mt-4'>
            {t('submit')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(CreateEvent);
