import React from 'react';
import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { DropArea } from './containers/drop-area/DropArea';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { FieldBox } from './containers/field-box/FieldBox';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme/theme';
import { DebugPanel } from './components/DebugPanel';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth={'xl'}>
                    <Typography variant={'caption'} color={'secondary'} gutterBottom>
                        DynoForms
                    </Typography>
                    <Grid container direction={'row'} spacing={2} justify={'center'}>
                        <Grid item xs={2}>
                            <FieldBox />
                        </Grid>
                        <Grid item xs={6}>
                            <DropArea />
                        </Grid>
                    </Grid>
                </Container>
                <DebugPanel />
            </ThemeProvider>
        </DndProvider>
    );
};

export default App;
