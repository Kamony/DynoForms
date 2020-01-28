import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Typography, CircularProgress, Paper } from '@material-ui/core';
import { TextInputBuilder } from '../../components/form-build-elements/TextInputBuilder';

import { useStore } from '../../store';
import { uuid } from '../../utils/uuid';
import { Formik, FormikValues } from 'formik';
import { useForm } from '../../hooks/useForm';
import { type } from 'os';

const RenderFormElement = ({ object, id, index }: { object: DragObjectWithType; id: string; index: number }) => {
    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return <TextInputBuilder id={id} index={index} />;
        default:
            return null;
    }
};

const useStyles = makeStyles({
    root: {
        background: '#FFFFFF',
        width: 600,
        minHeight: 500,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
});

export const DropArea = () => {
    const [elements, addElement] = useStore(s => s.elements, a => a.addFormElement);
    const classes = useStyles();
    const { createFormElement } = useForm();

    const [, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: dropItem => {
            createFormElement(dropItem.type as ElementTypes);
        },
    });

    // const handleSubmit = (values: FormikValues) => {
    //     console.log(values);
    // };

    // const getInitialValues = () => {
    //     const initialValues = elements.reduce((acc, obj) => ({ ...acc, [obj.id]: '' }), {});
    //     return initialValues;
    // };
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root}>
                {/*<Formik onSubmit={handleSubmit} initialValues={{}} enableReinitialize={true}>*/}
                {/*    {props => (*/}
                {/*        <form onSubmit={props.handleSubmit}>*/}
                {elements.map((el, i) => {
                    // console.log('formik props: ', props);
                    return <RenderFormElement object={el} id={el.id} key={el.id} index={i} />;
                })}
                {/*<Button type={'submit'}>Submit</Button>*/}
                {/*</form>*/}
                {/*)}*/}
                {/*</Formik>*/}
            </Paper>
        </Box>
    );
};
