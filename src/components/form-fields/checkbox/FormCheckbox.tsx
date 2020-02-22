import * as React from 'react';
import { useField } from 'formik';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';

type Props = CheckboxProps & {
    name: string;
    label: string;
    value?: boolean;
};

export const FormCheckBox: React.FC<Props> = ({ name, ...props }) => {
    const [field] = useField({ name });
    return (
        <FormControlLabel
            control={<Checkbox {...field} checked={field.value!!} value={field.value ? 'checked' : ''} />}
            label={props.label}
        />
    );
};
