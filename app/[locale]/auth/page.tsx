import { getTranslations } from 'next-intl/server';
import LoginOrRegister from '@components/authentication/login-or-register';

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: 'authentication' });

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

export default function Authentication() {
  return <LoginOrRegister />;
}
