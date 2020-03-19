import * as React from 'react';
import { createStyles, Grid, IconButton, Input, makeStyles, Tooltip } from '@material-ui/core';
import { Clear, DragIndicatorOutlined } from '@material-ui/icons';
import { CheckBoxField } from './form-fields/checkbox/FormCheckbox';
import { Field, FieldArray } from 'formik';
import { DragSortableItem } from './DragSortableItem';

const useStyles = makeStyles(
    createStyles({
        container: {
            '&:hover $dragContainer': {
                visibility: 'visible',
            },
        },
        dragContainer: {
            visibility: 'hidden',
            cursor: 'move',
        },
    }),
);

export const OptionsBuilder = ({ name }: { name: string }) => {
    const classes = useStyles();

    return (
        <FieldArray name={name}>
            {arrayHelpers => (
                <Grid container spacing={1} direction={'column'}>
                    {arrayHelpers.form.values[name].map((singleTag: any, index: number) => (
                        <DragSortableItem id={singleTag.label} index={index} swap={arrayHelpers.swap} key={index}>
                            <Grid
                                item
                                container
                                direction={'row'}
                                alignItems={'baseline'}
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
                    <Grid item container direction={'row'} alignItems={'baseline'} spacing={2}>
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <Input
                                readOnly={true}
                                fullWidth={true}
                                defaultValue="Add option"
                                inputProps={{ 'aria-label': 'add-option' }}
                                onClick={() => arrayHelpers.push({ value: false, label: '' })}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </FieldArray>
    );
};
