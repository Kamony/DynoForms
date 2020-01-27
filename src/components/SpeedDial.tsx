import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';

export type ActionType = {
    icon: React.ReactNode;
    name: string;
    color: string;
    onClick: () => void;
};

type Props = {
    actions: ActionType[];
};

export function OpenIconSpeedDial(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleActionClick = (action: () => void) => () => {
        action();
        handleClose();
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            FabProps={{ color: 'secondary', size: 'small', style: { boxShadow: 'none' } }}
            icon={<SpeedDialIcon icon={<EditIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={'left'}
        >
            {props.actions.map(action => (
                <SpeedDialAction
                    style={{ boxShadow: 'none' }}
                    key={action.name}
                    title={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipPlacement={'bottom'}
                    onClick={handleActionClick(action.onClick)}
                />
            ))}
        </SpeedDial>
    );
}
