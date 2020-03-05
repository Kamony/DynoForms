import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export type InputAttributes = TextFieldProps & {
    errorMessage?: string;
};

export const TextInput = ({ errorMessage = undefined, ...props }: InputAttributes) => {
    return (
        <TextField
            {...props}
            fullWidth={true}
            margin="none"
            variant={'standard'}
            error={!!errorMessage}
            helperText={errorMessage || props.helperText}
            id={'text-field'}
            inputProps={{ 'data-cy': 'text-field' }}
        />
    );
};
