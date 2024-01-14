import { type ClassValue, clsx } from 'clsx';
import mongoose from 'mongoose';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitHelperAndObjectify = (property: string) => {
  const ids: any = property.split(',');
  ids.forEach((program: string, index: number) => {
    ids[index] = new mongoose.Types.ObjectId(program);
  });

  return {
    $in: ids,
  };
};
