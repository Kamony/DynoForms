import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
    name: string;
    cy?: string;
};

export const FormInput: React.FC<Props> = ({ name, cy, ...props }) => {
    const [field, meta] = useField({ name, value: '' });
    return (
        <TextField
            name={field.name || ''}
            value={field.value || ''}
            onChange={field.onChange}
            fullWidth={true}
            margin="none"
            variant={'standard'}
            error={!!meta.error}
            helperText={meta.error || props.helperText}
            inputProps={{ 'data-cy': 'text-field' }}
            {...props}
        />
    );
};
