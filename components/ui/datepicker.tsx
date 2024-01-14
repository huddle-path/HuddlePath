import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  min?: Date;
  placeholder: string;
}

const DatePicker = <TFieldValues extends {}>({
  control,
  name,
  defaultValue,
  min,
  placeholder,
}: Props<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='w-full text-left'>
                {value ? format(new Date(value), 'PPP') : placeholder}
                <CalendarIcon className='ml-auto' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={value ? new Date(value) : undefined}
                onSelect={onChange}
                fromDate={min}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

export default DatePicker;
