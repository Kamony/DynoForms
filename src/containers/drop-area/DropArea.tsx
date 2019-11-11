import * as React from 'react';

import { DragObjectWithType, useDrop } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { InputFields, TextInput, TextInputEditDialog } from '../../components/form-fields/Input';
import { FormElement } from '../form-element/FormElement';
import { Delete, Edit, FileCopy } from '@material-ui/icons';

const RenderFormElement = ({ object, id }: { object: DragObjectWithType; id?: number }) => {
    const [textElement, setTextElement] = React.useState<InputFields>({
        label: 'default label',
        placeholder: 'default placeholder',
        required: false,
    });

    const [editOpen, setEditOpen] = React.useState(false);

    const handleClickOpen = () => {
        setEditOpen(true);
    };

    const handleClose = () => {
        setEditOpen(false);
    };

    const handleSaveClick = (payload: InputFields) => {
        setTextElement(payload);
        handleClose();
    };

    switch (object.type) {
        case ElementTypes.BUTTON:
            return (
                <Button variant={'contained'} color={'primary'} onClick={() => {}} key={id}>
                    I am a Button
                </Button>
            );
        case ElementTypes.INPUT:
            return (
                <>
                    <FormElement
                        title={'Input field'}
                        element={<TextInput {...textElement} />}
                        actions={[
                            {
                                icon: <Delete color={'secondary'} />,
                                name: 'Delete',
                                onClick: () => console.log('delete click'),
                            },
                            {
                                icon: <FileCopy color={'secondary'} />,
                                name: 'Copy',
                                onClick: () => console.log('copy click'),
                            },
                            { icon: <Edit color={'secondary'} />, name: 'Edit', onClick: () => handleClickOpen() },
                        ]}
                    />
                    <TextInputEditDialog open={editOpen} onSave={handleSaveClick} onClose={handleClose} />
                </>
            );
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
    const [elements, setElements] = React.useState<DragObjectWithType[]>([]);
    const [collectedProps, drop] = useDrop({
        accept: [ElementTypes.BUTTON, ElementTypes.INPUT],
        drop: (type, el) => {
            console.log('drop', { type, el });
            setElements([...elements, type]);
        },
    });
    const classes = useStyles();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Drop Area
            </Typography>
            <Paper ref={drop} className={classes.root}>
                {elements.map((element, index) => (
                    <RenderFormElement object={element} key={index} />
                ))}
            </Paper>
        </Box>
    );
};
