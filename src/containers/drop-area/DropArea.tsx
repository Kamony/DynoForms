import * as React from 'react';

import { useDrop } from 'react-dnd';
import { ElementTypes, FormElement } from '../../types/ElementTypes';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormBuildElement } from '../../components/form-build-elements/FormBuildElement';

import { useStore } from '../../store';
import { useForm } from '../../hooks/useForm';
import { FieldArray, Form, Formik } from 'formik';
import { FormInput } from '../../components/form-fields/input';

const useStyles = makeStyles({
    root: {
        padding: 10,
        display: 'flex',
        flex: '1 1 0',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
});

export const DropArea = () => {
    const [elements] = useStore(s => s.elements);
    const classes = useStyles();
    const { createFormElement } = useForm();

    const [, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: dropItem => {
            createFormElement(dropItem as FormElement);
        },
    });

    const getInitialValues = React.useCallback(() => {
        return elements.reduce((accumulator, element, index) => {
            return {
                ...accumulator,
                [element.name]: element.initialValue,
            };
        }, {});
    }, [elements]);

    return (
        <Box display={'flex'} flexDirection={'column'} style={{ height: '100%', width: '100%' }}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root} variant={'outlined'}>
                <Formik enableReinitialize={true} initialValues={getInitialValues()} onSubmit={() => {}}>
                    {formikProps => (
                        <FieldArray name={'elements'}>
                            {props => (
                                <Form>
                                    {elements.map((el, i) => (
                                        <FormBuildElement
                                            // @ts-ignore
                                            attributes={formikProps.values[i]}
                                            id={el.id}
                                            index={i}
                                            key={i}
                                        />
                                    ))}
                                    {console.log(formikProps.values)}
                                </Form>
                            )}
                        </FieldArray>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};
