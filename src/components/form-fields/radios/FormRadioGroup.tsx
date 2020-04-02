import React from 'react';
import { useField } from 'formik';
import { RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, FormHelperText } from '@material-ui/core';
import { RadioGroupProps } from '@material-ui/core/RadioGroup';

type Props = RadioGroupProps & {
    name: string;
    label: string;
    options: string[];
    errorMessage?: string;
    helperText?: string;
};

export const FormRadioGroup: React.FC<Props> = (props: Props) => {
    const [field] = useField(props.name);
    return (
        <FormControl required error={!!props.errorMessage} component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup name={field.name} value={field.value || ''} onChange={field.onChange} defaultValue={'Option 1'}>
                {props.options.map((option, i) => (
                    <FormControlLabel
                        key={option}
                        control={<Radio value={option} onChange={field.onChange} checked={field.value === option} />}
                        label={option}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>
                {!!props.errorMessage ? props.errorMessage : props.helperText ? props.helperText : null}
            </FormHelperText>
        </FormControl>
    );
};
