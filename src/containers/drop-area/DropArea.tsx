import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { TextInputBuilder } from '../../components/form-build-elements/TextInputBuilder';

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
            return <TextInputBuilder id={id} index={index} />;
        default:
            return null;
    }
};

const useStyles = makeStyles({
    root: {
        background: '#FFFFFF',
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
            createFormElement(dropItem.type as ElementTypes);
        },
    });

    return (
        <Box display={'flex'} flexDirection={'column'} style={{ height: '100%', width: '100%' }}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>

            <Paper ref={drop} className={classes.root} variant={'outlined'}>
                {elements.map((el, i) => {
                    return <RenderFormElement object={el} id={el.id} key={el.id} index={i} />;
                })}
            </Paper>
        </Box>
    );
};
