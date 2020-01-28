import React from 'react';
import { useField, Field } from 'formik';
import { MenuItem, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
    name: string;
    options: string[];
    value?: string;
};

export const FormSelect: React.FC<Props> = ({ name, ...props }) => {
    const [field, meta] = useField({ name: name, value: props.value || props.options[0] });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        field.onChange(event);
    };

    return (
        <TextField select {...props} {...field} error={!!meta.error} onChange={handleChange}>
            {props.options.map(option => (
                <MenuItem value={option} key={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};
