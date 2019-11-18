import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextInputBuilder } from '../../components/form-build-elements/TextInputBuilder';

import { useStore } from '../../store';
import { uuid } from '../../utils/uuid';

const RenderFormElement = ({ object, id }: { object: DragObjectWithType; id: string }) => {
    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return <TextInputBuilder id={id} />;
        default:
            return null;
    }
};

const useStyles = makeStyles({
    root: {
        background: '#FFFFFF',
        width: 600,
        minHeight: 400,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
});

export const DropArea = () => {
    const [elements, addElement] = useStore(s => s.elements, a => a.addFormElement);
    const classes = useStyles();

    const [, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: typeElement => {
            addElement({ id: uuid(), type: typeElement.type });
        },
    });

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>
            <Paper ref={drop} className={classes.root}>
                {elements.map(el => (
                    <RenderFormElement object={el} id={el.id} key={el.id} />
                ))}
            </Paper>
        </Box>
    );
};
