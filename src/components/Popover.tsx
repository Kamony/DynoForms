import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    createStyles,
    IconButton,
    makeStyles,
    Popover,
    Theme,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

type Props = {
    title: string;
    content: React.ReactNode[];
    actionButton: {
        label: string;
        onClick: () => void;
    };
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    }),
);

export function Popper(props: Props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleActionClick = () => {
        props.actionButton.onClick();
        handleClose();
    };

    const open = !!anchorEl;
    const id = open ? 'popover' : undefined;

    return (
        <div>
            <IconButton size={'small'} aria-describedby={id} aria-label="edit" onClick={handleClick}>
                <Edit />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Card className={classes.container}>
                    <CardHeader title={props.title} />
                    <CardContent>
                        {props.content.map((el, index) => (
                            <Box mb={1} key={index}>
                                {el}
                            </Box>
                        ))}
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button size="small" color="primary" variant={'contained'} onClick={handleActionClick}>
                            {props.actionButton.label}
                        </Button>
                    </CardActions>
                </Card>
            </Popover>
        </div>
    );
}
