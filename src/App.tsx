import React from 'react';
import { Box, Container, CssBaseline, Typography } from '@material-ui/core';
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
                <Container>
                    <Typography variant={'caption'} color={'secondary'} gutterBottom>
                        DynoForms
                    </Typography>
                    <Box display="flex" flexDirection={'row'} justifyContent={'space-around'}>
                        <FieldBox />
                        <DropArea />
                    </Box>
                </Container>
                <DebugPanel />
            </ThemeProvider>
        </DndProvider>
    );
};

export default App;
