import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextInputBuilder } from '../../components/form-build-elements/TextInputBuilder';

import { useStore } from '../../store/FormStore';
import { uuid } from '../../utils/uuid';

const RenderFormElement = ({ object, id }: { object: DragObjectWithType; id?: number }) => {
    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return <TextInputBuilder />;
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

    const [collectedProps, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: (type, el) => {
            console.log('drop', { type, el });
            // setElements([...elements, type]);
            addElement({ id: uuid(), type: type });
        },
    });

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>
            <Paper ref={drop} className={classes.root}>
                {elements.map(el => (
                    <RenderFormElement object={el.type} />
                ))}
            </Paper>
        </Box>
    );
};
