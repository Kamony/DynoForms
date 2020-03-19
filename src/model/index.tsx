import { ElementTypes, FormElement } from '../types/ElementTypes';
import {
    CheckBoxOutlined as CheckBoxIcon,
    FormatColorTextOutlined as TextInputIcon,
    Looks3Outlined as NumberIcon,
} from '@material-ui/icons';
import { FormInput, TextInput } from '../components/form-fields/input';
import React from 'react';
import { NumberInput } from '../components/form-fields/number';
import { CheckBox } from '../components/form-fields/checkbox/Checkbox';

export const formElements: FormElement[] = [
    {
        label: 'Text Input',
        icon: <TextInputIcon color={'secondary'} />,
        type: ElementTypes.INPUT,
        validationType: 'string',
        initialValue: '',
        editable: true,
        attributes: [
            { name: 'label', type: 'input', label: 'label', default: 'text label' },
            { name: 'placeholder', type: 'input', label: 'placeholder', default: 'text placeholder' },
            { name: 'helperText', type: 'input', label: 'helperText', default: 'helper text' },
            { name: 'type', type: 'select', label: 'type', options: ['text', 'password', 'email'], default: 'text' },
        ],
        renderComponent: FormInput,
    },
    {
        label: 'Number',
        icon: <NumberIcon color={'secondary'} />,
        type: ElementTypes.INPUT,
        validationType: 'number',
        initialValue: '',
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
        validationType: 'boolean',
        editable: true,
        initialValue: [
            { label: 'Option 1', value: false },
            { label: 'Option 2', value: false },
            { label: 'Option 3', value: true },
        ],
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'checkbox label' },
            {
                type: 'options',
                name: 'options',
                label: 'manage options',
                default: [
                    { label: 'Option 1', value: false },
                    { label: 'Option 2', value: false },
                    { label: 'Option 3', value: true },
                ],
            },
            // { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
        ],
        renderComponent: CheckBox,
    },
];
