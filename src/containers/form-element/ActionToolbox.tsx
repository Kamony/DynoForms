import React from 'react';
import { ActionType } from '../../components/SpeedDial';
import { createStyles, makeStyles, Theme, Tooltip, useTheme } from '@material-ui/core';
import { DeleteOutlined, FileCopyOutlined } from '@material-ui/icons';
import { useStore } from '../../store';

type ToolBoxProps = {
    formElementId: string;
    actions?: ActionType[];
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
                borderRightWidth: 0,
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
);

export const FormElementToolbox: React.FC<ToolBoxProps> = props => {
    const classes = useToolboxStyles();
    const theme = useTheme();
    const [, storeActions] = useStore(undefined, a => a);

    const handleDeleteClick = () => {
        storeActions.removeFormElement(props.formElementId);
    };

    const handleCopyClick = () => {
        storeActions.copyFormElement(props.formElementId);
    };

    const commonActions = [
        {
            icon: <FileCopyOutlined color={'action'} />,
            name: 'Copy',
            color: theme.palette.grey.A100,
            onClick: handleCopyClick,
        },
        {
            icon: <DeleteOutlined color={'error'} />,
            name: 'Delete',
            color: theme.palette.error.main,
            onClick: handleDeleteClick,
        },
    ];

    const actions = props.actions ? [...props.actions, ...commonActions] : [...commonActions];

    return (
        <div className={classes.container}>
            {actions.map((action, i) => (
                <Tooltip title={action.name} key={i}>
                    <div className={classes.actionItem} onClick={action.onClick} data-cy={`action-${action.name}`}>
                        {action.icon}
                    </div>
                </Tooltip>
            ))}
        </div>
    );
};
