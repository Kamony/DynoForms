import {
    createStyles,
    Dialog,
    DialogTitle,
    IconButton,
    makeStyles,
    Tab,
    Tabs,
    Theme,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { TabPanel } from './TabPanel';
import { ElementType } from '../../store';
import { AttributesEditField } from '../fields/AttributesEditField';
import { ValidationEditSchema, ValidationsEditField } from '../fields/ValidationsEditField';
import { Attributes } from '../../utils/createFieldAttributesEditFields';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
    open: boolean;
    onClose: () => void;
    element: ElementType;
    attributes: Attributes;
    validations: ValidationEditSchema;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
    }),
);

export const ModalWithTabs = (props: Props) => {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                fullWidth={true}
                maxWidth={'sm'}
                aria-labelledby="edit-inputField-dialog"
            >
                <DialogTitle disableTypography className={classes.root}>
                    <Typography variant="h6">Edit Form Element</Typography>
                    <IconButton aria-label="close" onClick={props.onClose} className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
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
        </>
    );
};
