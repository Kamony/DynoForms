import { ValidationType } from '../hooks/usePredefinedValidations';
import { Attributes } from '../utils/createFieldAttributesEditFields';
import { ValidationEditSchema } from '../containers/fields/ValidationsEditField';
import { RequiredInitialValues } from '../components/form-validations/Required';
import { StringTypeInitialValues } from '../components/form-validations/StringType';
import { MaxInitialValues } from '../components/form-validations/Max';
import { MinInitialValues } from '../components/form-validations/Min';

export enum ElementTypes {
    BUTTON = 'BUTTON',
    INPUT = 'INPUT',
    CUSTOM = 'CUSTOM',
    FORMELEMENT = 'FORMELEMENT',
}

export type FormElement = {
    label: string;
    name?: string;
    icon?: React.ReactElement<any>;
    type: ElementTypes;
    validationType: ValidationType;
    attributes: Attributes;
    validationSchema: ValidationEditSchema;
    initialValue?: any;
    editable: boolean;
    renderComponent: any;
};

// export type ValidationType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'mixed';

// export type Validations = 'required' | 'min' | 'max' | 'length' | 'match' | 'email' | 'url' | 'type';
