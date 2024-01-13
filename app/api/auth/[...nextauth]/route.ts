import withDbConnection from '@app/HOFs/server/withDbConnection';
import { authConfig } from '@lib/authConfig';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authConfig);

const GET = withDbConnection(handler);
const POST = withDbConnection(handler);

export { GET, POST };
