import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Divider, List, Paper, Typography } from '@material-ui/core';
import { DraggableField } from '../../components/DraggableField';
import { FormElement } from '../../types/ElementTypes';
import { useForm } from '../../hooks/useForm';
import { formElements } from '../../model';

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

    const handleClick = (formElement: FormElement) => () => {
        createFormElement(formElement);
    };

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Form toolbox
            </Typography>
            <Paper className={classes.container} variant={'outlined'}>
                <List>
                    {formElements.map((formElement, i) => (
                        <DraggableField key={i} formElement={formElement} onClick={handleClick(formElement)} />
                    ))}
                    <Divider />
                    {props.children}
                </List>
            </Paper>
        </Box>
    );
};
