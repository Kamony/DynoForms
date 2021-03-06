import { FormInput } from '../components/form-fields/input';
import { inputCommonAttributes } from '../components/form-validations/common';
import React from 'react';
import { FormSelect } from '../components/form-fields/select/FormSelect';
import { Validations } from '../hooks/usePredefinedValidations';
import { Max } from '../components/form-validations/Max';
import { Min } from '../components/form-validations/Min';
import { Required } from '../components/form-validations/Required';
import { StringType } from '../components/form-validations/StringType';
import { OptionsBuilder } from '../components/OptionsBuilder';

type formType = 'input' | 'select' | 'options';

export type Attribute = {
    type: formType;
    name: string;
    label: string;
    default: any;
    options?: string[];
    isInitial?: boolean;
};

export type Attributes = Attribute[];

export const getAttributeEditField = (attribute: Attribute) => {
    const attributesFieldMap: Record<formType, React.ReactElement> = {
        input: <FormInput fullWidth={true} name={attribute.name} label={attribute.label} {...inputCommonAttributes} />,
        select: (
            <FormSelect
                name={attribute.name}
                label={attribute.label}
                options={attribute.options!}
                fullWidth={true}
                {...inputCommonAttributes}
            />
        ),
        options: <OptionsBuilder name={attribute.name} />,
    };

    return attributesFieldMap[attribute.type];
};

export const getValidationEditField = (validationType: Validations, disabledErrorField: boolean) => {
    const validationsFieldMap: Record<Validations, React.ReactElement> = {
        max: <Max disabledParam={disabledErrorField} />,
        min: <Min disabledParam={disabledErrorField} />,
        required: <Required disabledParam={disabledErrorField} />,
        type: <StringType disabledParam={disabledErrorField} />,
        length: <Max disabledParam={disabledErrorField} />,
        email: <Max disabledParam={disabledErrorField} />,
        match: <Max disabledParam={disabledErrorField} />,
        url: <Max disabledParam={disabledErrorField} />,
    };

    return validationsFieldMap[validationType];
};
