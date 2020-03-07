import React from 'react';
import { FormElement } from '../types/ElementTypes';
import { useDrag } from 'react-dnd';
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Help } from '@material-ui/icons';

type Props = {
    formElement: FormElement;
    onClick?: () => void;
};

export const DraggableField: React.FC<Props> = (props: Props) => {
    const [{ isDragging }, drag] = useDrag({
        item: props.formElement,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return (
        <ListItem ref={drag} style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer' }} onClick={props.onClick}>
            <ListItemAvatar>
                {props.formElement.icon ? props.formElement.icon : <Help color={'secondary'} />}
            </ListItemAvatar>
            <ListItemText primary={props.formElement.label} />
        </ListItem>
    );
};
