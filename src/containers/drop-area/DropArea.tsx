import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TextInput } from '../../components/form-fields/Input';

const renderFormElemenet = (object: DragObjectWithType, id?: number) => {
    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return <TextInput key={id} />;
        default:
            return {};
    }
};

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        width: 600,
        minHeight: 400,
        padding: 10,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
});

export const DropArea = () => {
    const [elements, setElements] = React.useState<DragObjectWithType[]>([]);
    const [collectedProps, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: (type, el) => {
            console.log('drop', { type, el });
            setElements([...elements, type]);
        },
    });
    const classes = useStyles();
    console.log('Elements: ', elements);
    console.log('Collected props: ', collectedProps);
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'}>Drop Area</Typography>
            <Paper ref={drop} className={classes.root}>
                {elements.map((element, index) => renderFormElemenet(element, index))}
            </Paper>
        </Box>
    );
};
