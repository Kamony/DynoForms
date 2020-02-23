import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

export const ValuesContextReporter = ({ onValueChange }: { onValueChange: (values: FormikValues) => void }) => {
    const { values } = useFormikContext();

    React.useEffect(() => {
        if (values) {
            onValueChange(values as FormikValues);
        }
    }, [values, onValueChange]);

    return null;
};
