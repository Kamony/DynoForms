import React from 'react';
import { Button, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { ActionType } from '../../components/SpeedDial';
import { DragHandleOutlined } from '@material-ui/icons';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ElementTypes } from '../../types/ElementTypes';
import { useStore } from '../../store';
import { FormElementToolbox } from './ActionToolbox';
import { useForm } from '../../hooks/useForm';

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
    const { validateFormElement } = useForm();
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ElementTypes.FORMELEMENT,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveElement(dragIndex, hoverIndex);
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

    const handleValidation = () => {
        validateFormElement(props.id);
    };

    return (
        <Paper className={classes.container} style={{ width: '100%', opacity }} ref={ref} elevation={0}>
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
                    <Grid item xs={10}>
                        <div className={classes.elementContainer}>{props.element}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={handleValidation} size={'small'} variant={'outlined'}>
                            validate
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
