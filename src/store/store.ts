import { DragObjectWithType } from 'react-dnd';
import { FormikValues } from 'formik';
import { ValidationType } from '../hooks/usePredefinedValidations';
import { ElementTypes } from '../types/ElementTypes';

export type ElementType = DragObjectWithType &
    FormikValues & {
        id: string;
        type: ElementTypes;
        value: any;
        validationType: ValidationType;
        error?: string;
    };

export interface IState {
    elements: ElementType[];
}
