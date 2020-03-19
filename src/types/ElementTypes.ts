import { ValidationType } from '../hooks/usePredefinedValidations';
import { Attributes } from '../utils/createFieldAttributesEditFields';

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
    initialValue: any;
    editable: boolean;
    renderComponent: any;
};
