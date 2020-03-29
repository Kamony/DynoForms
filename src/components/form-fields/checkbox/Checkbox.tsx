import * as React from 'react';
import { FormControl, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { CheckboxProps as MUICheckboxProps } from '@material-ui/core/Checkbox';
import { FormCheckBox } from './FormCheckbox';
import { FieldArray } from 'formik';

export type CheckBoxProps = MUICheckboxProps & {
    label: string;
    name: string;
    value?: boolean;
};

type Props = {
    label: string;
    name: string;
    options: CheckBoxProps[];
    errorMessage?: string;
    helperText?: string;
};

export const CheckBox: React.FC<Props> = ({ label, name, options, helperText, errorMessage, ...props }: Props) => {
    return (
        <FormControl required error={!!errorMessage} component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                <FieldArray name={name || ''}>
                    {() =>
                        options &&
                        options.map((option, i) => {
                            return <FormCheckBox key={i} label={option.label} name={`${name}.${i}.value`} />;
                        })
                    }
                </FieldArray>
            </FormGroup>
            <FormHelperText>{!!errorMessage ? errorMessage : helperText ? helperText : null}</FormHelperText>
        </FormControl>
    );
};
