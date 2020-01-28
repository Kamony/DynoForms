import React from 'react';
import { TextField } from '@material-ui/core';

export type InputAttributes = {
    label: string;
    placeholder: string;
    type: string;
};

export const TextInput: React.FC<InputAttributes> = (props: InputAttributes) => {
    return <TextField {...props} fullWidth={true} margin="none" />;
};
