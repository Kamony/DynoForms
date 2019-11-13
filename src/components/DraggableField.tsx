import React from 'react';
import { ElementTypes } from '../types/ElementTypes';
import { useDrag } from 'react-dnd';
import { ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import { Help } from '@material-ui/icons';

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
        <ListItem ref={drag} style={{ opacity: isDragging ? 0.8 : 1 }}>
            <ListItemAvatar>{props.icon ? props.icon : <Help color={'secondary'} />}</ListItemAvatar>
            <ListItemText primary={props.label} />
        </ListItem>
    );
};
