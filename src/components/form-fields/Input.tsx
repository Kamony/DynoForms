import React from 'react';
import { Button, CardActions, CardContent, CardHeader, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SimplePopover } from '../../containers/Popover';

type Props = {};

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: 90,
    },
});

export const TextInput: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [label, setLabel] = React.useState('Label');
    const [state, setState] = React.useState({
        label: 'Label',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setLabel(event.target.value);
    };

    return (
        <Paper className={classes.container}>
            <TextField id="standard-basic" label={label} margin="normal" />
            <SimplePopover>
                <CardHeader title="Edit input field" />
                <CardContent>
                    <TextField id="edit-label" label={'Input Label'} onChange={handleChange} value={label} variant={'outlined'} />
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </SimplePopover>
        </Paper>
    );
};
