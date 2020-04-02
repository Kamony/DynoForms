import { ElementTypes, FormElement } from '../types/ElementTypes';
import {
    CheckBoxOutlined as CheckBoxIcon,
    RadioButtonCheckedOutlined as RadioIcon,
    FormatColorTextOutlined as TextInputIcon,
    Looks3Outlined as NumberIcon,
} from '@material-ui/icons';
import { FormInput } from '../components/form-fields/input';
import React from 'react';
import { NumberInput } from '../components/form-fields/number';
import { CheckBox } from '../components/form-fields/checkbox/Checkbox';
import { ValidationEditSchema } from '../containers/fields/ValidationsEditField';
import { RequiredInitialValues } from '../components/form-validations/Required';
import { StringTypeInitialValues } from '../components/form-validations/StringType';
import { MaxInitialValues } from '../components/form-validations/Max';
import { MinInitialValues } from '../components/form-validations/Min';
import { FormRadioGroup } from '../components/form-fields/radios/FormRadioGroup';
import { Radio } from '../components/form-fields/radios/Radio';

export const formElements: FormElement[] = [
    {
        label: 'Text Input',
        icon: <TextInputIcon color={'secondary'} />,
        type: ElementTypes.INPUT,
        validationType: 'string',
        editable: true,
        attributes: [
            { name: 'label', type: 'input', label: 'label', default: 'text label' },
            { name: 'placeholder', type: 'input', label: 'placeholder', default: 'text placeholder' },
            { name: 'helperText', type: 'input', label: 'helperText', default: 'helper text' },
            { name: 'type', type: 'select', label: 'type', options: ['text', 'password', 'email'], default: 'text' },
        ],
        validationSchema: [
            { type: 'required', initialValues: RequiredInitialValues },
            { type: 'type', initialValues: StringTypeInitialValues },
            { type: 'max', initialValues: MaxInitialValues },
            { type: 'min', initialValues: MinInitialValues },
        ],
        renderComponent: FormInput,
    },
    // {
    //     label: 'Number',
    //     icon: <NumberIcon color={'secondary'} />,
    //     type: ElementTypes.INPUT,
    //     validationType: 'number',
    //     editable: true,
    //     attributes: [
    //         { type: 'input', name: 'label', label: 'label', default: 'number label' },
    //         { type: 'input', name: 'placeholder', label: 'placeholder', default: 'number placeholder' },
    //         { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
    //     ],
    //     renderComponent: NumberInput,
    // },
    {
        label: 'Checkbox',
        type: ElementTypes.INPUT,
        icon: <CheckBoxIcon color={'secondary'} />,
        validationType: 'array',
        editable: true,
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'checkbox label' },
            {
                type: 'options',
                name: 'options',
                label: 'manage options',
                isInitial: true,
                default: [
                    { label: 'Option 1', value: false },
                    { label: 'Option 2', value: false },
                    { label: 'Option 3', value: true },
                ],
            },
            { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
        ],
        validationSchema: [{ type: 'required', initialValues: RequiredInitialValues }],
        renderComponent: CheckBox,
    },
    {
        label: 'Radio',
        type: ElementTypes.INPUT,
        icon: <RadioIcon color={'secondary'} />,
        validationType: 'array',
        editable: true,
        attributes: [
            { type: 'input', name: 'label', label: 'label', default: 'radio label' },
            {
                type: 'options',
                name: 'options',
                label: 'manage options',
                default: ['Option 1', 'Option 2', 'Option 3'],
            },
            { type: 'input', name: 'helperText', label: 'helperText', default: 'helper text' },
        ],
        validationSchema: [{ type: 'required', initialValues: RequiredInitialValues }],
        renderComponent: FormRadioGroup,
    },
];
