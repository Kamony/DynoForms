import React from 'react';
import { Container, CssBaseline, Grid, Switch, Typography } from '@material-ui/core';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { FieldBox } from './containers/field-box/FieldBox';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme/theme';
import { DebugPanel } from './components/DebugPanel';
import { DropArea } from './containers/drop-area/DropArea';
import { Preview } from './containers/Preview';
import { Builder } from './containers/Builder';

const App: React.FC = () => {
    const [builderState, setBuilderState] = React.useState(true);

    const toggleState = () => {
        setBuilderState(!builderState);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth={'xl'}>
                    <Typography variant={'caption'} color={'secondary'} gutterBottom>
                        DynoForms
                    </Typography>
                    <Grid container alignItems={'center'}>
                        <Grid item>Preview</Grid>
                        <Grid item>
                            <Switch checked={builderState} onChange={toggleState} value="checkedA" size={'medium'} />
                        </Grid>
                        <Grid item>Builder</Grid>
                    </Grid>
                    {builderState ? <Builder /> : <Preview />}
                    {/*<Grid container direction={'row'} spacing={2} justify={'center'}>*/}
                    {/*    <Grid item xs={3}>*/}
                    {/*        <FieldBox />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={8}>*/}
                    {/*        <DropArea />*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Container>
                <DebugPanel />
            </ThemeProvider>
        </DndProvider>
    );
};

export default App;
