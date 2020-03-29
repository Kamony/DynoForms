import * as React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useStore } from '../store';
import { useForm } from '../hooks/useForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
        },
    }),
);

export const Preview = () => {
    const [elements] = useStore(s => s.elements);
    const classes = useStyles();
    const { getInitialValues } = useForm();

    const getElementAttributes = React.useCallback(
        (id: any) => {
            return elements.find(el => el.id === id)!.attributes;
        },
        [elements],
    );

    return (
        <div className={classes.container}>
            <Typography variant={'h5'} color={'primary'} gutterBottom>
                Preview
            </Typography>

            <Formik
                enableReinitialize={true}
                initialValues={getInitialValues()}
                onSubmit={values => {
                    console.log('submit values: ', values);
                }}
            >
                {formikProps => {
                    return (
                        <Form>
                            <Grid container spacing={2} direction={'row'}>
                                <Grid item xs={6}>
                                    <Typography color={'primary'} gutterBottom>
                                        Form
                                    </Typography>
                                    <Paper className={classes.container}>
                                        {elements.map((el, i) => {
                                            return (
                                                <el.renderElement
                                                    key={i}
                                                    name={el.name}
                                                    {...getElementAttributes(el.id)}
                                                />
                                            );
                                        })}
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color={'primary'} gutterBottom>
                                        Values
                                    </Typography>
                                    <Paper className={classes.container}>
                                        <pre>{JSON.stringify(formikProps.values, null, 2)}</pre>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color={'primary'} gutterBottom>
                                        Errors
                                    </Typography>
                                    <Paper className={classes.container}>
                                        <pre>{JSON.stringify(formikProps.errors, null, 2)}</pre>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography color={'primary'} gutterBottom>
                                        Touched
                                    </Typography>
                                    <Paper className={classes.container}>
                                        <pre>{JSON.stringify(formikProps.touched, null, 2)}</pre>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <button type={'submit'}>submit</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
