import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '@styles/globals.css';
import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider, createTranslator } from 'next-intl';
import { LOCALE_PROPS } from '../constants/translation';
import NextAuthSessionProvider from '@utils/providers/session-provider';
import QueryProvider from '@utils/providers/react-query-provider';
import Loading from './Loading';
import { Toaster } from '@components/ui/toaster';
import AppWrapper from '@components/general/AppWrapper';
import { unstable_setRequestLocale } from 'next-intl/server';

const inter = Inter({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['serif'],
});

async function getTranslations(locale: string) {
  try {
    return (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return LOCALE_PROPS;
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const translations = await getTranslations(locale);
  const t = createTranslator({ locale, messages: translations });

  return {
    title: t('localeLayoutMeta.title'),
    description: t('localeLayoutMeta.description'),
    manifest: '/favicon/site.webmanifest',
    icons: {
      apple: '/favicon/favicon-32x32.png',
      icon: '/favicon/favicon-32x32.png',
      shortcut: '/favicon/favicon-32x32.png',
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
  session,
}: {
  children: React.ReactNode;
  params: { locale: string };
  session: any;
}) {
  unstable_setRequestLocale(locale);

  let translations;

  try {
    translations = await getTranslations(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={LOCALE_PROPS.find((prop) => prop.locale === locale)?.dir}
      className='bg-huddlepath-gray'
    >
      <body className={inter.className}>
        <NextIntlClientProvider
          timeZone='Asia/Dubai'
          locale={locale}
          messages={translations}
        >
          <NextAuthSessionProvider session={session}>
            <QueryProvider>
              <Suspense fallback={<Loading />}>
                <AppWrapper>{children}</AppWrapper>
              </Suspense>
            </QueryProvider>
          </NextAuthSessionProvider>

          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
