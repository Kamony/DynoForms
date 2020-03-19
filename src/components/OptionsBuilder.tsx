import * as React from 'react';
import {
    Box,
    Button,
    createStyles,
    Grid,
    IconButton,
    Input,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { Clear, DragIndicatorOutlined } from '@material-ui/icons';
import { CheckBoxField } from './form-fields/checkbox/FormCheckbox';
import { Field, FieldArray } from 'formik';
import { DragSortableItem } from './DragSortableItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            '&:hover $dragContainer': {
                visibility: 'visible',
            },
        },
        dragContainer: {
            visibility: 'hidden',
            cursor: 'move',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            left: theme.spacing(1.5),
        },
        wrapper: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: theme.palette.grey.A100,
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(2),
        },
        actionArea: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        actionDivider: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    }),
);

export const OptionsBuilder = ({ name }: { name: string }) => {
    const classes = useStyles();

    return (
        <FieldArray name={name}>
            {arrayHelpers => (
                <Grid container spacing={1} direction={'column'} className={classes.wrapper}>
                    <Typography color={'textPrimary'}>Set Options</Typography>
                    {arrayHelpers.form.values[name].map((singleTag: any, index: number) => (
                        <DragSortableItem id={singleTag.label} index={index} swap={arrayHelpers.swap} key={index}>
                            <Grid
                                item
                                container
                                direction={'row'}
                                alignItems={'center'}
                                spacing={2}
                                className={classes.container}
                            >
                                <div className={classes.dragContainer}>
                                    <DragIndicatorOutlined color={'action'} />
                                </div>
                                <Tooltip title="Initial check" aria-label="initial check" enterDelay={500}>
                                    <Grid item xs={1}>
                                        <CheckBoxField name={`${name}.${index}.value`} />
                                    </Grid>
                                </Tooltip>
                                <Grid item xs={8}>
                                    <Field name={`${name}.${index}.label`}>
                                        {({ field }: any) => {
                                            return (
                                                <Input
                                                    placeholder={`Option ${index + 1}`}
                                                    inputProps={{ 'aria-label': 'add-option' }}
                                                    autoFocus={true}
                                                    fullWidth={true}
                                                    onFocus={event => {
                                                        event.target.select();
                                                    }}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    </Field>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip title="Remove option" aria-label="remove-option" enterDelay={500}>
                                        <IconButton aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                                            <Clear />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </DragSortableItem>
                    ))}
                    <Box p={2} className={classes.actionArea}>
                        <Button
                            color={'primary'}
                            variant={'outlined'}
                            onClick={() => arrayHelpers.push({ value: false, label: '' })}
                        >
                            Add Option
                        </Button>
                        <div className={classes.actionDivider}>
                            <Typography color={'textSecondary'}>or</Typography>
                        </div>
                        <Button
                            variant={'text'}
                            size={'small'}
                            onClick={() => arrayHelpers.push({ value: false, label: 'Other' })}
                        >
                            Add 'Other' Option
                        </Button>
                    </Box>
                </Grid>
            )}
        </FieldArray>
    );
};
