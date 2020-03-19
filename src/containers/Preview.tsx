import * as React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useStore } from '../store';

export const Preview = () => {
    const [elements] = useStore(s => s.elements);

    const getInitialValues = React.useCallback(() => {
        return elements.reduce((accumulator, element, index) => {
            return {
                ...accumulator,
                [element.name]: element.initialValue,
            };
        }, {});
    }, [elements]);

    const getElementAttributes = React.useCallback(
        (id: any) => {
            return elements.find(el => el.id === id)!.attributes;
        },
        [elements],
    );

    return (
        <Grid item xs={12}>
            <Paper>
                <Typography variant={'h5'} color={'primary'} gutterBottom>
                    Preview
                </Typography>

                <Formik
                    enableReinitialize={true}
                    initialValues={getInitialValues()}
                    onSubmit={values => {
                        console.log('submit values: ', values);
                    }}
                >
                    {formikProps => {
                        return (
                            <Form>
                                {elements.map((el, i) => {
                                    return <el.renderElement key={i} name={el.name} {...getElementAttributes(el.id)} />;
                                })}
                                <pre>{JSON.stringify(formikProps.values, null, 2)}</pre>
                                <button type={'submit'}>submit</button>
                            </Form>
                        );
                    }}
                </Formik>
            </Paper>
        </Grid>
    );
};
