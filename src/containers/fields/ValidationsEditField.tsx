import React from 'react';
import { Formik, FormikValues } from 'formik';
import { Button, Grid } from '@material-ui/core';
import { ElementType, useStore } from '../../store';
import { Validation, Validations } from '../../hooks/usePredefinedValidations';
import { getValidationEditField } from '../../utils/createFieldAttributesEditFields';
import { ValuesContextReporter } from '../../components/form-fields/ValuesContextReporter';

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
    const [valuesSnapshot, setValuesSnapshot] = React.useState<FormikValues>();

    const getInitialValues = React.useCallback(() => {
        return props.validations.reduce((accumulator, validation) => {
            return {
                ...accumulator,
                ...validation.initialValues,
            };
        }, {});
    }, [props.validations]);

    const [validationsValues, setValidationsValues] = React.useState({
        ...getInitialValues(),
        ...props.element.validations,
    });
    const isValueEditing = () => valuesSnapshot !== validationsValues;
    const onValueChange = (values: FormikValues) => {
        setValidationsValues(values);
    };
    const handleSave = (values: FormikValues) => {
        setValidations(props.element.id, values);
        setValuesSnapshot(validationsValues);
    };

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
                        <Grid item xs={12}>
                            <Button
                                fullWidth={true}
                                type={'submit'}
                                color="secondary"
                                variant={'outlined'}
                                disabled={!isValueEditing()}
                            >
                                {isValueEditing() ? 'Save Validations' : 'Saved!'}
                            </Button>
                        </Grid>
                    </Grid>
                    <ValuesContextReporter onValueChange={onValueChange} />
                </form>
            )}
        </Formik>
    );
};
