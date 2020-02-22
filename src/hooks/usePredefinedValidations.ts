import { ElementTypes } from '../types/ElementTypes';
import { FormikValues } from 'formik';

export type ValidationType = 'string' | 'number';

export type Validations = 'required' | 'min' | 'max' | 'length' | 'match' | 'email' | 'url';

export type Validation = {
    type: Validations;
    params: any[];
};

const commonValidations = { required: true, requiredParams: 'field is required' };
const stringValidations = { ...commonValidations };

export const usePredefinedValidations = () => {
    const attributes: Record<ElementTypes, FormikValues> = {
        [ElementTypes.INPUT]: stringValidations,
        [ElementTypes.BUTTON]: {},
        [ElementTypes.FORMELEMENT]: {},
    };

    const getValidationsForType = (type: ElementTypes) => {
        return attributes[type];
    };

    return { getValidationsForType };
};
