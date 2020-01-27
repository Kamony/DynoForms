import React from 'react';
import { createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ActionType } from '../../components/SpeedDial';
import { DragHandleOutlined } from '@material-ui/icons';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { useStore } from '../../store';
import { FormElementToolbox } from './ActionToolbox';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(1),
        },
        pointer: {
            cursor: 'move',
        },
        container: {
            width: '100%',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.grey.A100,
        },
    }),
);

type Props = {
    title: string;
    element: React.ReactNode;
    actions: ActionType[];
    index: number;
    id: string;
};

type DragItem = {
    index: number;
    id: string;
    type: string;
};

export const FormElement: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [, moveElement] = useStore(s => s.elements, a => a.swapFormElements);

    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ElementTypes.FORMELEMENT,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveElement(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: ElementTypes.FORMELEMENT, id: props.id, index: props.index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <Paper className={classes.container} style={{ opacity }} ref={ref} elevation={0}>
            <Grid container direction={'column'}>
                <Grid item container direction={'row'} justify={'space-between'}>
                    <Grid item className={classes.pointer}>
                        <DragHandleOutlined color={'action'} />
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
                <Grid item className={classes.spacing}>
                    {props.element}
                </Grid>
            </Grid>
        </Paper>
    );
};
