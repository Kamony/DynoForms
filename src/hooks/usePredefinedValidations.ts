import { ElementTypes } from '../types/ElementTypes';

export type ValidationType = 'string' | 'number';

export type Validations = 'required' | 'min' | 'max' | 'length' | 'match' | 'email' | 'url';

export type Validation = {
    type: Validations;
    params: any[];
};

const stringValidations: Validation[] = [{ type: 'required', params: ['Field is required'] }];

export const usePredefinedValidations = () => {
    const attributes: Record<ElementTypes, Validation[]> = {
        [ElementTypes.INPUT]: stringValidations,
        [ElementTypes.BUTTON]: {} as Validation[],
        [ElementTypes.FORMELEMENT]: {} as Validation[],
    };

    const getValidationsForType = (type: ElementTypes) => {
        return attributes[type];
    };

    return { getValidationsForType };
};
