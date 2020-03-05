import * as React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@material-ui/core';
import { CheckboxProps as MUICheckboxProps } from '@material-ui/core/Checkbox';

export type CheckBoxProps = MUICheckboxProps & {
    label: string;
    name: string;
    value?: boolean;
};

type Props = {
    label: string;
    options: CheckBoxProps[];
    errorMessage?: string;
    helperText?: string;
};

export const CheckBox: React.FC<Props> = ({ label, options, helperText, errorMessage, ...props }: Props) => {
    return (
        <FormControl required error={!!errorMessage} component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                {options &&
                    options.map((option, i) => {
                        const { label, value, ...props } = option;
                        return (
                            <FormControlLabel
                                key={i}
                                control={<Checkbox {...props} checked={value!!} value={value ? 'checked' : ''} />}
                                label={label}
                            />
                        );
                    })}
            </FormGroup>
            <FormHelperText>{!!errorMessage ? errorMessage : helperText ? helperText : null}</FormHelperText>
        </FormControl>
    );
};
