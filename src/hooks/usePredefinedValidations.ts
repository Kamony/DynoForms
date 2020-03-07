import { ElementTypes } from '../types/ElementTypes';
import { FormikValues } from 'formik';
import { ValidationEditSchema } from '../containers/fields/ValidationsEditField';
import { RequiredInitialValues } from '../components/form-validations/Required';
import { StringTypeInitialValues } from '../components/form-validations/StringType';
import { MaxInitialValues } from '../components/form-validations/Max';
import { MinInitialValues } from '../components/form-validations/Min';

export type ValidationType = 'string' | 'number';

export type Validations = 'required' | 'min' | 'max' | 'length' | 'match' | 'email' | 'url' | 'type';

export type Validation = {
    type: Validations;
    params: any[];
};

const commonValidations = { required: true, requiredParams: 'field is required' };
const stringValidations = { ...commonValidations };

const stringEditValidations: ValidationEditSchema = [
    { type: 'required', initialValues: RequiredInitialValues },
    { type: 'type', initialValues: StringTypeInitialValues },
    { type: 'max', initialValues: MaxInitialValues },
    { type: 'min', initialValues: MinInitialValues },
];

export const usePredefinedValidations = () => {
    const defaultValidations: Record<ElementTypes, FormikValues> = {
        [ElementTypes.INPUT]: stringValidations,
        [ElementTypes.BUTTON]: {},
        [ElementTypes.FORMELEMENT]: {},
        [ElementTypes.CUSTOM]: {},
    };

    const editValidations: Record<ElementTypes, ValidationEditSchema> = {
        [ElementTypes.INPUT]: stringEditValidations,
        [ElementTypes.BUTTON]: [],
        [ElementTypes.FORMELEMENT]: [],
        [ElementTypes.CUSTOM]: [],
    };

    const getValidationsForType = (type: ElementTypes) => {
        return defaultValidations[type];
    };

    const getValidationSchemaForType = (type: ElementTypes) => {
        return editValidations[type];
    };

    return { getValidationsForType, getValidationSchemaForType };
};
