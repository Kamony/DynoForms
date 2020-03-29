import * as React from 'react';

import { useDrop } from 'react-dnd';
import { ElementTypes, FormElement } from '../../types/ElementTypes';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormBuildElement } from '../../components/form-build-elements/FormBuildElement';

import { useStore } from '../../store';
import { useForm } from '../../hooks/useForm';
import { Form, Formik } from 'formik';

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
    const { createFormElement, getInitialValues } = useForm();

    const [, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: dropItem => {
            createFormElement(dropItem as FormElement);
        },
    });

    return (
        <Box display={'flex'} flexDirection={'column'} style={{ height: '100%', width: '100%' }}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root} variant={'outlined'}>
                <Formik enableReinitialize={true} initialValues={getInitialValues()} onSubmit={() => {}}>
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
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};
