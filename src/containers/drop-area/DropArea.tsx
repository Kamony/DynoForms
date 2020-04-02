import * as React from 'react';

import { useDrop } from 'react-dnd';
import { ElementTypes, FormElement } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormBuildElement } from '../../components/form-build-elements/FormBuildElement';

import { useStore } from '../../store';
import { useForm } from '../../hooks/useForm';
import { Form, Formik } from 'formik';

import * as yup from 'yup';
import { object } from 'yup';

const useStyles = makeStyles({
    root: {
        padding: 10,
        display: 'flex',
        flex: '1 1 0',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    dropArea: {
        width: '100%',
        justifyContent: 'center',
    },
});

export const DropArea = () => {
    const [elements] = useStore(s => s.elements);
    const classes = useStyles();
    const { createFormElement, getInitialValues, getValidationSchema } = useForm();

    const [, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: dropItem => {
            createFormElement(dropItem as FormElement);
        },
    });

    // const testSchema = yup.object().shape({
    //     checkbox: yup
    //         .array()
    //         .of(
    //             yup.object().shape({
    //                 value: yup.bool().required('is required'),
    //             }),
    //         )
    //         .min(2, 'this is my wictory')
    //         .required('is broadly required'),
    // });
    return (
        <Box display={'flex'} flexDirection={'column'} style={{ height: '100%', width: '100%' }}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root} variant={'outlined'}>
                <Formik
                    enableReinitialize={true}
                    initialValues={getInitialValues()}
                    onSubmit={() => {}}
                    validationSchema={getValidationSchema()}
                >
                    {formikProps => (
                        <Form className={classes.dropArea}>
                            {elements.map((el, i) => (
                                <FormBuildElement
                                    // @ts-ignore
                                    attributes={formikProps.values[i]}
                                    id={el.id}
                                    index={i}
                                    key={i}
                                />
                            ))}
                            {console.log('errors: ', formikProps.errors)}
                            {console.log('values: ', formikProps.values)}
                            <Button onClick={() => formikProps.resetForm()}>Reset form values</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};
