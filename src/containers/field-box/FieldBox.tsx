import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Divider, List, Paper, Typography } from '@material-ui/core';
import { DraggableField } from '../../components/DraggableField';
import { ElementTypes } from '../../types/ElementTypes';
import { AddBoxOutlined, TextFields } from '@material-ui/icons';
import { useForm } from '../../hooks/useForm';

type Props = {
    children?: React.ReactNode;
};

const useStyles = makeStyles({
    container: {
        minHeight: 500,
    },
});

export const FieldBox: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { createFormElement } = useForm();

    const handleClick = (type: ElementTypes) => () => {
        createFormElement(type);
    };

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Form toolbox
            </Typography>
            <Paper className={classes.container} variant={'outlined'}>
                <List>
                    <DraggableField
                        type={ElementTypes.BUTTON}
                        label={'Button'}
                        icon={<AddBoxOutlined color={'secondary'} />}
                        onClick={handleClick(ElementTypes.BUTTON)}
                    />
                    <Divider />
                    <DraggableField
                        type={ElementTypes.INPUT}
                        label={'Input'}
                        icon={<TextFields color={'secondary'} />}
                        onClick={handleClick(ElementTypes.INPUT)}
                    />
                    <Divider />
                    {props.children}
                </List>
            </Paper>
        </Box>
    );
};
