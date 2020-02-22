import React from 'react';
import { useField } from 'formik';
import { MenuItem, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
    name: string;
    options: string[];
    initialValue?: string;
};

export const FormSelect: React.FC<Props> = ({ name, options, initialValue, ...props }) => {
    const [field, meta] = useField({ name: name, value: initialValue || options[0] });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        field.onChange(event);
    };

    return (
        <TextField {...props} {...field} select error={!!meta.error} onChange={handleChange}>
            {options.map(option => (
                <MenuItem value={option} key={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};
