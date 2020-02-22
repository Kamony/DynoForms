import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { useForm } from '../../hooks/useForm';

type Props = {
    id: string;
};

export const ValidateActions = (props: Props) => {
    const { validateFormElement, resetValidations, isElementValidated } = useForm();

    const handleValidateClick = () => {
        validateFormElement(props.id);
    };
    const handleResetClick = () => {
        resetValidations(props.id);
    };

    return (
        <ButtonGroup variant="outlined" aria-label="split button" size={'small'}>
            <Button onClick={handleValidateClick}>validate</Button>
            <Button
                size="small"
                color={'primary'}
                aria-label="reset validations"
                onClick={handleResetClick}
                disabled={!isElementValidated(props.id)}
            >
                <ClearIcon />
            </Button>
        </ButtonGroup>
    );
};
