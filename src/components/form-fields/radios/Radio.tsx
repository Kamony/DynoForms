import * as React from 'react';
import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { CheckboxProps as MUICheckboxProps } from '@material-ui/core/Checkbox';

import { FieldArray } from 'formik';
import { FormRadioGroup } from './FormRadioGroup';
import { RadioField } from './FormRadio';
import { CheckBoxField } from '../checkbox/FormCheckbox';

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

export const Radio: React.FC<Props> = ({ label, name, options, helperText, errorMessage, ...props }: Props) => {
    return (
        <FormControl required error={!!errorMessage} component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                <FieldArray name={name || ''}>
                    {() =>
                        options &&
                        options.map((option, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    control={<RadioField name={`${name}.${i}.value`} />}
                                    label={option.label}
                                />
                            );
                        })
                    }
                </FieldArray>
            </FormGroup>
            <FormHelperText>{!!errorMessage ? errorMessage : helperText ? helperText : null}</FormHelperText>
        </FormControl>
    );
};
