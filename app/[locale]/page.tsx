import { unstable_setRequestLocale } from 'next-intl/server';
import Home from './home/page';

export default function Landing({ params: { locale } }: any) {
  unstable_setRequestLocale('en');
  return <Home />;
}
