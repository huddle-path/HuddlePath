'use client';
import { QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import { queryClient } from '@lib/queryConfig';

export default function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
