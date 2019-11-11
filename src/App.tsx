import React from 'react';
import { Box, Container, CssBaseline, Typography } from '@material-ui/core';
import { DropArea } from './containers/drop-area/DropArea';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { FieldBox } from './containers/field-box/FieldBox';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <CssBaseline />
            <Container>
                <Typography align={'center'} variant={'h2'} color={'secondary'} gutterBottom>
                    DynoForms
                </Typography>
                <Box display="flex" flexDirection={'row'} justifyContent={'space-around'}>
                    <FieldBox />
                    <DropArea />
                </Box>
            </Container>
        </DndProvider>
    );
};

export default App;
