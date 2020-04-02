import React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ActionType } from '../../components/SpeedDial';
import { DragHandleOutlined } from '@material-ui/icons';
import { useStore } from '../../store';
import { FormElementToolbox } from './ActionToolbox';
import { ValidateActions } from './ValidateActions';
import { DragSortableItem } from '../../components/DragSortableItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(1),
        },
        dragArea: {
            cursor: 'move',
            padding: theme.spacing(0.2, 1, 0.2, 1),
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            width: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.grey.A100,
        },
        elementContainer: {
            padding: theme.spacing(0, 2, 1, 2),
        },
    }),
);

type Props = {
    title: string;
    element: React.ReactNode;
    actions?: ActionType[];
    index: number;
    id: string;
};

export const FormElement: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [, swapElements] = useStore(
        s => s,
        a => a.swapFormElements,
    );

    return (
        <DragSortableItem id={props.id} index={props.index} swap={swapElements}>
            <Paper className={classes.container} style={{ width: '100%' }} elevation={0}>
                <Grid container direction={'column'}>
                    <Grid item container direction={'row'} justify={'space-between'}>
                        <Grid item>
                            <div className={classes.dragArea}>
                                <DragHandleOutlined color={'action'} className={classes.center} />
                            </div>
                        </Grid>
                        <Grid item className={classes.spacing}>
                            <Typography color={'secondary'} variant={'overline'}>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FormElementToolbox formElementId={props.id} actions={props.actions} />
                        </Grid>
                    </Grid>
                    <Grid item container direction={'row'} alignItems={'center'} spacing={1}>
                        <Grid item xs={12}>
                            <div className={classes.elementContainer}>{props.element}</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </DragSortableItem>
    );
};
