import createMiddleware from 'next-intl/middleware';
import { LOCALES } from './app/constants/translation';

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: 'en',
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
