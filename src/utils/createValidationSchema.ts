import * as yup from 'yup';
import { Validation, ValidationType } from '../hooks/usePredefinedValidations';
import { FormikValues } from 'formik';

export const getMappedValidations = (values: FormikValues): Validation[] => {
    let validations: Validation[] = [];
    Object.entries(values).forEach(([key, value]: [any, any]) => {
        if (!value) {
            return;
        }
        if (!key.includes('Param')) {
            let validation: Validation;
            if (key === 'type') {
                validation = {
                    type: values[key],
                    params: [values[`${key}Param`]],
                };
            } else {
                validation = {
                    type: key,
                    params: [values[`${key}Param`]],
                };
                if (value && typeof value !== 'boolean') {
                    validation.params.unshift(value);
                }
            }

            if (!(typeof value === 'boolean' && !value)) {
                validations.push(validation);
            }
        }
    });
    return validations;
};

export const createValidationFieldSchema = (values: FormikValues, validationType: ValidationType) => {
    const fieldValidations = getMappedValidations(values);
    let fieldSchema: any = yup[validationType]();
    fieldValidations.forEach(validation => {
        const { params, type } = validation;
        if (!fieldSchema[type]) {
            return;
        }
        fieldSchema = fieldSchema[type](...params);
    });
    return fieldSchema;
};
