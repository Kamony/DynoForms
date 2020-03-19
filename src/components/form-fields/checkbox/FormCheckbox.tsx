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
    return <FormControlLabel control={<CheckBoxField name={name} />} label={props.label} />;
};

export const CheckBoxField: React.FC<{ name: string }> = ({ name }) => {
    const [field] = useField({ name });
    return (
        <Checkbox
            {...field}
            name={field.name || ''}
            checked={field.value!! || false}
            value={field.value ? 'checked' : ''}
        />
    );
};
