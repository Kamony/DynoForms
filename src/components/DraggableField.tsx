import React from 'react';
import { ElementTypes } from '../types/ElementTypes';
import { useDrag } from 'react-dnd';
import {makeStyles, Typography} from '@material-ui/core';

type Props = {
    type: ElementTypes;
    label: string;
    icon?: React.ReactNode;
};

const useStyles = makeStyles({
    card: {
        background: '#FFFFFF',
        border: '1px dashed #383838',
        borderRadius: 20,
        height: 80,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export const DraggableField: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag({
        item: { type: props.type },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <div className={classes.card} ref={drag} style={{ opacity: isDragging ? 0.8 : 1 }}>
            {props.icon ? props.icon : null}
            <Typography variant={'caption'}>{props.label}</Typography>
        </div>
    );
};
