import React from 'react';
import { Typography } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const App: React.FC = () => {
    return (
        <>
            <Typography align={'center'} variant={'h1'}>
                Clean React Template
            </Typography>
            <AccessAlarmIcon />
        </>
    );
};

export default App;
