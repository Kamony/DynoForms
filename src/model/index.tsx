import { ElementTypes, FormElement } from '../types/ElementTypes';
import {
    CheckBoxOutlined as CheckBoxIcon,
    FormatColorTextOutlined as TextInputIcon,
    Looks3Outlined as NumberIcon,
} from '@material-ui/icons';
import { TextInput } from '../components/form-fields/input';
import React from 'react';
import { NumberInput } from '../components/form-fields/number';
import { CheckBox } from '../components/form-fields/checkbox/Checkbox';

export const formElements: FormElement[] = [
    {
        label: 'Text Input',
        icon: <TextInputIcon color={'secondary'} />,
        type: ElementTypes.INPUT,
        validationType: 'string',
        editable: true,
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'text label' },
            { type: 'input', name: 'placeholder', label: 'placeholder', default: 'text placeholder' },
            { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
            { type: 'select', name: 'type', label: 'type', options: ['text', 'password', 'email'], default: 'text' },
        ],
        renderComponent: TextInput,
    },
    {
        label: 'Number',
        icon: <NumberIcon color={'secondary'} />,
        type: ElementTypes.INPUT,
        validationType: 'number',
        editable: true,
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'number label' },
            { type: 'input', name: 'placeholder', label: 'placeholder', default: 'number placeholder' },
            { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
        ],
        renderComponent: NumberInput,
    },
    {
        label: 'Checkbox',
        type: ElementTypes.INPUT,
        icon: <CheckBoxIcon color={'secondary'} />,
        validationType: 'number',
        editable: true,
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'checkbox label' },
            { type: 'options', name: 'options', label: 'manage options', default: '' },
            // { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
        ],
        renderComponent: CheckBox,
    },
];
