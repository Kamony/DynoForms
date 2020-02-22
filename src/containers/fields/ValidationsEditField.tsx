import { ElementType, useStore } from '../../store';
import { Formik, FormikValues } from 'formik';
import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { Required, RequiredInitialValues } from '../../components/form-validations/Required';
import { StringType, StringTypeInitialValues } from '../../components/form-validations/StringType';
import { Max, MaxInitialValues } from '../../components/form-validations/Max';
import { Min, MinInitialValues } from '../../components/form-validations/Min';

type AttributesEditFieldProps = {
    element: ElementType;
};
export const ValidationsEditField = (props: AttributesEditFieldProps) => {
    const [, setValidations] = useStore(s => s, a => a.setFormElementValidations);

    const handleSave = (values: FormikValues) => {
        setValidations(props.element.id, values);
    };

    return (
        <Formik
            initialValues={{
                ...MaxInitialValues,
                ...RequiredInitialValues,
                ...StringTypeInitialValues,
                ...MinInitialValues,
                ...props.element.validations,
            }}
            onSubmit={handleSave}
        >
            {formProps => (
                <form onSubmit={formProps.handleSubmit} noValidate>
                    <Grid container direction={'column'} spacing={1}>
                        <Grid item>
                            <Required disabledParam={!formProps.values.required} />
                        </Grid>
                        <Grid item>
                            <StringType disabledParam={formProps.values.type === 'text'} />
                        </Grid>
                        <Grid item>
                            <Max disabledParam={!formProps.values.max} />
                        </Grid>
                        <Grid item>
                            <Min disabledParam={!formProps.values.min} />
                        </Grid>
                        <Button type={'submit'} color="primary">
                            Save Validations
                        </Button>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};
