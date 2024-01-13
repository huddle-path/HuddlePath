import { IHttpResponse } from './types';
import { NextResponse } from 'next/server';

export const apiResponse = <TData = any>({
  status,
  message,
  data,
}: Partial<IHttpResponse<TData>>) => {
  return NextResponse.json({ message, data }, { status });
};
