import React from 'react';
import { useField } from 'formik';
import { Radio } from '@material-ui/core';

type FormRadioProps = {
    name: string;
};

export const RadioField = ({ name }: FormRadioProps) => {
    const [field, meta] = useField({ name });
    return <Radio {...field} name={field.name || ''} />;
};
