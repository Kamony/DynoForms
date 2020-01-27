import React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ActionType } from '../../components/SpeedDial';
import { DragHandleOutlined } from '@material-ui/icons';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { useStore } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacing: {
            padding: theme.spacing(1),
        },
        pointer: {
            cursor: 'move',
        },
    }),
);

type ToolBoxProps = {
    actions: ActionType[];
};

const useToolboxStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.grey.A100,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderTopWidth: 0,
        },
        actionItem: {
            padding: theme.spacing(0.2, 1, 0.2, 1),
            borderRightWidth: 1,
            borderRightStyle: 'solid',
            borderRightColor: theme.palette.grey.A100,
            cursor: 'pointer',
            '&:last-child': {
                borderRight: 'none',
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
);

const FormElementToolbox: React.FC<ToolBoxProps> = props => {
    const classes = useToolboxStyles();
    return (
        <div className={classes.container}>
            {props.actions.map((action, i) => (
                <div className={classes.actionItem} onClick={action.onClick} title={action.name} key={i}>
                    {action.icon}
                </div>
            ))}
        </div>
    );
};

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
        <Paper style={{ width: '100%', opacity }} square ref={ref}>
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
                        <FormElementToolbox actions={props.actions} />
                    </Grid>
                </Grid>
                <Grid item className={classes.spacing}>
                    {props.element}
                </Grid>
            </Grid>
        </Paper>
    );
};
