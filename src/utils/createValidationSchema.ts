// export function createYupSchema(schema: any, config: any) {
//     const { id, validationType, validations = [] } = config;
//     if (!yup[validationType]) {
//         return schema;
//     }
//     let validator = yup[validationType]();
//     validations.forEach((validation: any) => {
//         const { params, type } = validation;
//         if (!validator[type]) {
//             return;
//         }
//         console.log(type, params);
//         validator = validator[type](...params);
//     });
//     schema[id] = validator;
//     return schema;
// }
import * as yup from 'yup';
import { Validation, ValidationType } from '../hooks/usePredefinedValidations';

export const createValidationFieldSchema = (fieldValidations: Validation[], validationType: ValidationType) => {
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
