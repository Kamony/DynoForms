import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes, FormElement } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { FormBuildElement } from '../../components/form-build-elements/FormBuildElement';

import { useStore } from '../../store';
import { useForm } from '../../hooks/useForm';

const RenderFormElement = ({ object, id, index }: { object: DragObjectWithType; id: string; index: number }) => {
    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return <FormBuildElement id={id} index={index} />;
        default:
            return null;
    }
};

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
            // console.log('dropItem', dropItem);
            createFormElement(dropItem as FormElement);
        },
    });

    return (
        <Box display={'flex'} flexDirection={'column'} style={{ height: '100%', width: '100%' }}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root} variant={'outlined'}>
                {elements.map((el, i) => {
                    return <FormBuildElement id={el.id} index={i} key={i} />;
                })}
            </Paper>
        </Box>
    );
};
