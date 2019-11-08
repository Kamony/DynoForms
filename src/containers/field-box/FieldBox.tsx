import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { DraggableField } from '../../components/DraggableField';
import { ElementTypes } from '../../types/ElementTypes';
import {AddBoxOutlined} from "@material-ui/icons";

type Props = {
    children?: React.ReactNode;
};

const useStyles = makeStyles({
    container: {
        width: 300,
        height: 500,
    },
});

export const FieldBox: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'}>Form toolbox</Typography>
            <Paper className={classes.container}>
                <DraggableField type={ElementTypes.BUTTON} label={'Button'} icon={<AddBoxOutlined />} />
                <DraggableField type={ElementTypes.INPUT} label={'Input'} />
                {props.children}
            </Paper>
        </Box>
    );
};
