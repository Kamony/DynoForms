import { Dialog, Grid, Paper, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { TabPanel } from './TabPanel';
import { ElementType } from '../../store';
import { AttributesEditField } from '../fields/AttributesEditField';
import { ValidationsEditField } from '../fields/ValidationsEditField';

type Props = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
};

export const ModalWithTabs = (props: Props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="edit-inputField-dialog">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                indicatorColor="primary"
                textColor="primary"
                variant={'fullWidth'}
            >
                <Tab label="Attributes" />
                <Tab label="Validations" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AttributesEditField element={props.element} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ValidationsEditField element={props.element} />
            </TabPanel>
        </Dialog>
    );
};
