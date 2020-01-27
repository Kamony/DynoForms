import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Divider, List, Paper, Typography } from '@material-ui/core';
import { DraggableField } from '../../components/DraggableField';
import { ElementTypes } from '../../types/ElementTypes';
import { AddBoxOutlined, TextFields } from '@material-ui/icons';

type Props = {
    children?: React.ReactNode;
};

const useStyles = makeStyles({
    container: {
        width: 250,
        height: 500,
    },
});

export const FieldBox: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Form toolbox
            </Typography>
            <Paper className={classes.container}>
                <List>
                    <DraggableField
                        type={ElementTypes.BUTTON}
                        label={'Button'}
                        icon={<AddBoxOutlined color={'secondary'} />}
                    />
                    <Divider />
                    <DraggableField
                        type={ElementTypes.INPUT}
                        label={'Input'}
                        icon={<TextFields color={'secondary'} />}
                    />
                    <Divider />
                    {props.children}
                </List>
            </Paper>
        </Box>
    );
};
