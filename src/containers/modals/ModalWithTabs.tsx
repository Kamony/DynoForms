import { Dialog, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { TabPanel } from './TabPanel';
import { ElementType } from '../../store';
import { AttributesEditField } from '../fields/AttributesEditField';
import { ValidationEditSchema, ValidationsEditField } from '../fields/ValidationsEditField';
import { Attributes } from '../../utils/createFieldAttributesEditFields';

type Props = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
    attributes: Attributes;
    validations: ValidationEditSchema;
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
                aria-label="tabbed panel"
                indicatorColor="primary"
                textColor="primary"
                variant={'fullWidth'}
            >
                <Tab label="Attributes" />
                <Tab label="Validations" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AttributesEditField element={props.element} attributes={props.attributes} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ValidationsEditField element={props.element} validations={props.validations} />
            </TabPanel>
        </Dialog>
    );
};
