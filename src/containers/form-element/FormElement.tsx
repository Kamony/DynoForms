import React from 'react';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import {ActionType, OpenIconSpeedDial} from '../../components/SpeedDial';

type Props = {
    title: string;
    element: React.ReactNode;
    actions: ActionType[];
};

export const FormElement: React.FC<Props> = (props: Props) => {
    return (
        <Card style={{ width: '100%' }}>
            <CardHeader
                title={props.title}
                titleTypographyProps={{
                    color: 'secondary',
                }}
                action={<OpenIconSpeedDial actions={props.actions} />}
            />
            <CardContent>{props.element}</CardContent>
        </Card>
    );
};
