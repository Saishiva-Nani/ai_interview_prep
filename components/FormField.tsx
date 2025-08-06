import React from 'react'

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues>{
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder? : string;
    type? : 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({control, name, label, placeholder, type="text"}: FormFieldProps<T>) => (
    <Controller 
        name={name} 
        control={control} 
        render={({field}) => (
        <FormItem>
            <FormLabel className="label text-white">{label}</FormLabel>
            <FormControl>
                <Input
                    className=" input bg-neutral-900 text-white border border-neutral-700 placeholder:text-neutral-500"
                    placeholder={placeholder}
                    type={type}
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}>
            
    </Controller>
)

export default FormField