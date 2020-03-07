import { DragObjectWithType } from 'react-dnd';
import { FormikValues } from 'formik';
import { ValidationType } from '../hooks/usePredefinedValidations';
import { ElementTypes } from '../types/ElementTypes';
import { Attribute } from '../utils/createFieldAttributesEditFields';

export type ElementType = DragObjectWithType &
    FormikValues & {
        id: string;
        label: string;
        type: ElementTypes;
        value: any;
        renderElement: any;
        editable: boolean;
        validationType: ValidationType;
        editAttrsSchema?: Attribute[] | any;
        error?: string;
    };

export interface IState {
    elements: ElementType[];
}
