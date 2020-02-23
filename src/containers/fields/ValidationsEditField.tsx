import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { Validations } from '../../hooks/usePredefinedValidations';
import { getValidationEditField } from '../../utils/createFieldAttributesEditFields';

export type ValidationEditSchema = {
    type: Validations;
    initialValues: FormikValues;
}[];

type AttributesEditFieldProps = {
    element: ElementType;
    validations: ValidationEditSchema;
};
export const ValidationsEditField = (props: AttributesEditFieldProps) => {
    const [, setValidations] = useStore(
        s => s,
        a => a.setFormElementValidations,
    );

    const handleSave = (values: FormikValues) => {
        setValidations(props.element.id, values);
    };

    const getInitialValues = React.useCallback(() => {
        return props.validations.reduce((accumulator, validation) => {
            return {
                ...accumulator,
                ...validation.initialValues,
            };
        }, {});
    }, [props.validations]);

    return (
        <Formik initialValues={{ ...getInitialValues(), ...props.element.validations }} onSubmit={handleSave}>
            {formProps => (
                <form onSubmit={formProps.handleSubmit} noValidate>
                    <Grid container direction={'column'} spacing={1}>
                        {props.validations.map(validation => {
                            const errorMessageDisabled =
                                validation.type === 'type'
                                    ? (formProps.values as FormikValues)[validation.type] === 'text'
                                    : !(formProps.values as FormikValues)[validation.type];
                            return (
                                <Grid item key={validation.type}>
                                    {getValidationEditField(validation.type, errorMessageDisabled)}
                                </Grid>
                            );
                        })}
                        <Button type={'submit'} color="primary">
                            Save Validations
                        </Button>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};
