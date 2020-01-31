import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export type InputAttributes = TextFieldProps & {
    label: string;
    placeholder: string;
    type: string;
    errorMessage?: string;
    onBlur?: (value: string) => {};
};

export const TextInput: React.FC<InputAttributes> = ({ errorMessage, ...props }: InputAttributes) => {
    const handleOnBlur = (event: any) => {
        if (props.onBlur) {
            props.onBlur(event.target.value);
        }
    };
    return (
        <TextField
            {...props}
            fullWidth={true}
            margin="none"
            onBlur={handleOnBlur}
            error={!!errorMessage}
            helperText={errorMessage || props.helperText}
        />
    );
};
