import { DragObjectWithType } from 'react-dnd';
import { FormikValues } from 'formik';
import { ValidationType } from '../hooks/usePredefinedValidations';

export type ElementType = DragObjectWithType &
    FormikValues & {
        id: string;
        value: any;
        validationType: ValidationType;
        error?: string;
    };

export interface IState {
    elements: ElementType[];
}
