import React from 'react';
import { useField } from 'formik';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroupProps } from '@material-ui/core/RadioGroup';

type Props = RadioGroupProps & {
    name: string;
    options: string[];
};

export const FormRadioGroup: React.FC<Props> = (props: Props) => {
    const [field, meta] = useField(props.name);
    return (
        <RadioGroup {...field} {...props}>
            {props.options.map(option => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
        </RadioGroup>
    );
};
