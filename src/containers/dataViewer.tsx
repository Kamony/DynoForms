import React from 'react';
import { useStore } from '../store';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Box, Theme, Typography } from '@material-ui/core';

type Props = {};

const useStyles = makeStyles((theme: Theme) => {
    console.log(theme);
    return {
        root: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            flexGrow: 1,
            maxWidth: 300,
            overflow: 'scroll',
        },
    };
});

export const DataViewer: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [elements] = useStore(s => s.elements);
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Data view
            </Typography>
            <pre className={classes.root}>{JSON.stringify(elements, null, 2)}</pre>
        </Box>
    );
};
