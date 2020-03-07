import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
    name: string;
    cy?: string;
};

export const FormInput: React.FC<Props> = ({ name, cy, ...props }) => {
    const [field, meta] = useField(name);
    return (
        <TextField {...props} {...field} error={!!meta.error} helperText={meta.error} inputProps={{ 'data-cy': cy }} />
    );
};
